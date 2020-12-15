const mongoose = require("mongoose");
const fetch = require("node-fetch");
var parser = require("xml2json");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const {
  loginValidation,
  registerValidation,
  resetPasswordValidation,
} = require("../validation/validation");

let YoutubeLink;
try {
  YoutubeLink = mongoose.model("YoutubeLinks");
} catch {
  YoutubeLink = require("../models/YoutubeLinks");
}

let User;
try {
  User = mongoose.model("Users");
} catch {
  User = require("../models/Users");
}

let Article;
try {
  Article = mongoose.model("Articles");
} catch {
  Article = require("../models/Articles");
}

export const resolvers = {
  Query: {
    youtubeLinks: async () => await YoutubeLink.find({}).sort("-date"),

    podcasts: async () =>
      await fetch(`https://anchor.fm/s/333e122c/podcast/rss`)
        .then((response) => response.text())
        .then((data) => {
          let json = JSON.parse(parser.toJson(data, { reversible: false }));
          return json.rss.channel.item.map((element) => {
            const text = element["description"]
              .replace(/<[^>]+>/g, "")
              .replace(/&nbsp;/, "");
            return {
              title: element["title"],
              by: element["dc:creator"],
              link: element["enclosure"]["url"],
              date: element["pubDate"],
              image: element["itunes:image"]["href"],
              description: text.substring(0, text.indexOf("---")),
            };
          });
        }),

    isLoggedIn: async (parent, args, ctx) => {
      const { authData } = ctx;
      if (!authData) {
        throw Error("Please login to proceed");
      }

      try {
        const user = await User.findById(authData._id);
        return user;
      } catch (err) {
        throw Error(err.message);
      }
    },

    login: async (parent, args, ctx) => {
      const { error } = loginValidation(args);
      if (error) {
        const toReturn = error.details[0].message
          .replace('"email"', "Email")
          .replace('"password"', "Password");
        throw Error(toReturn);
      }
      const { cookie } = ctx;
      const { email, password } = args;
      const user = await User.findOne({ email: email });

      if (!user) throw Error("The email or password is incorrect");

      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) throw Error("The email or password is incorrect");

      const token = jwt.sign(
        { _id: user._id, tokenCreated: new Date() },
        process.env.TOKEN_SECRET
      );
      cookie("token", token, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
      });
      return { token: token };
    },

    logout: (parent, args, ctx) => {
      try {
        const { cookie } = ctx;
        cookie("token", "deleted", {
          path: "/",
          httpOnly: true,
          maxAge: 0,
          sameSite: "strict",
        });
      } catch {
        return false;
      }
      return true;
    },

    forgotPassword: async (parent, args, ctx) => {
      const { error } = resetPasswordValidation(args);
      if (error) {
        const toReturn = error.details[0].message.replace('"email"', "Email");
        throw Error(toReturn);
      }

      await User.findOne({ email: args.email }, async (err, user) => {
        if (err || !user) {
          if (err) {
            throw Error(err.message);
          } else if (!user) {
            throw Error("Cannot find account matching given email");
          }
        } else {
          const secret = `${user.password}-${user.updatedAt}`;
          const token = jwt.sign({ id: user._id, email: user.email }, secret);
          const passwordResetLink =
            process.env.NODE_ENV === "production"
              ? `www.thefalseninepodcast.com/resetpassword?id=${user._id}&token=${token}`
              : `localhost:3000/resetpassword?id=${user._id}&token=${token}`;

          const msg = {
            from: `The False 9 Podcast <${process.env.EMAIL}>`,
            to: user.email,
            subject: "Password Reset Link",
            text: `Password Reset Link: ${passwordResetLink}`,
          };

          sgMail
            .send(msg)
            .then(() => {
              console.log("Email sent");
            })
            .catch((error) => {
              console.error(error);
              throw Error(error.message);
            });
        }
      });
      return true;
    },

    articles: async (parent, args, ctx) => {
      let user;
      const { authData } = ctx;
      if (authData) {
        try {
          user = await User.findById(authData._id);
        } catch (err) {
          console.log(err);
        }
      }

      let query;
      if (user) {
        if (user.isModerator) {
          query = Article.find({}).sort("-date");
        } else {
          query = Article.find({
            $or: [{ isApproved: true }, { authorId: user._id }],
          }).sort("-date");
        }
      } else {
        query = Article.find({}).where("isApproved").equals(true).sort("-date");
      }
      try {
        const data = await query.exec();
        const toReturn = data.map((article) => ({
          _id: article._id,
          title: article.title,
          author: article.author,
          authorId: article.authorId,
          date: article.date,
          image: article.image,
          content: JSON.stringify(article.content),
          comments: article.comments.map((comment) => ({
            _id: comment._id,
            authorId: comment.authorID,
            author: comment.author,
            content: JSON.stringify(comment.content),
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
          })),
        }));
        return toReturn;
      } catch (err) {
        throw Error(err.message);
      }
    },
  },

  Mutation: {
    register: async (parent, args, ctx) => {
      const { error } = registerValidation(args);
      if (error) {
        const toReturn = error.details[0].message
          .replace('"firstName"', "First Name")
          .replace('"lastName"', "Last Name")
          .replace('"email"', "Email")
          .replace('"password"', "Password");
        throw Error(toReturn);
      }

      const emailExists = await User.findOne({ email: args.email });

      if (emailExists) throw Error("Email already exists");

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(args.password, salt);

      const user = new User({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        password: hashPassword,
        isModerator: false,
        isSubscribed: args.isSubscribed || false,
      });

      try {
        const savedUser = await user.save();
        return savedUser;
      } catch (err) {
        throw Error(err.message);
      }
    },

    subscribe: async (parent, args, ctx) => {
      const { authData } = ctx;
      if (!authData) {
        throw Error("Please login to proceed");
      }

      try {
        const user = await User.findById(authData._id);
        user.isSubscribed = args.isSubscribed;
        return await user.save();
      } catch (err) {
        throw Error(err.message);
      }
    },

    resetPassword: async (parent, args, ctx) => {
      let savedUser;
      try {
        const user = await User.findById(args._id);
        const secret = `${user.password}-${user.updatedAt}`;
        const verified = jwt.verify(args.token, secret);
        if (verified) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(args.password, salt);
          user.password = hashPassword;
          savedUser = await user.save();
        }
      } catch (err) {
        throw Error(err.message);
      }
      return savedUser;
    },
  },
};
