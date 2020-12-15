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

let Comment;
try {
  Comment = mongoose.model("Comments");
} catch {
  Comment = require("../models/Comments");
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
          isApproved: article.isApproved,
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

    article: async (parent, args, ctx) => {
      const id = args._id;
      let article;
      try {
        article = await Article.findById(id);
      } catch (err) {
        throw Error(err);
      }
      return {
        _id: article._id,
        title: article.title,
        author: article.author,
        authorId: article.authorId,
        date: article.date,
        image: article.image,
        isApproved: article.isApproved,
        content: JSON.stringify(article.content),
        comments: article.comments.map((comment) => ({
          _id: comment._id,
          authorId: comment.authorID,
          author: comment.author,
          content: JSON.stringify(comment.content),
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        })),
      };
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

    createArticle: async (parent, args, ctx) => {
      const { authData } = ctx;
      if (!authData) {
        throw Error("Please login to proceed");
      }
      let savedArticle;
      try {
        const user = await User.findById(authData._id);
        if (user) {
          const article = new Article({
            title: "To be edited",
            author: `${user.firstName} ${user.lastName}`,
            authorId: user._id,
            date: new Date(),
            image:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEXk5OQAAACgoKD6+vrp6enf39/n5+fa2tqwsLD+/v6dnZ3u7u7Dw8Oqqqrr6+vKyso7Ozvy8vLQ0NAnJye2trYuLi56enrU1NQ1NTUrKyu8vLysrKzGxsaWlpYKCgoVFRWEhISLi4twcHDZ3h3mAAAFY0lEQVR4nO3c23abMBAFUJtgYSCWi+tcajtN2///yEKcC1chjURHx53z1pcu7TUSM8JZrNa3nhX3AhaPCPEjQvyIED8ixI8I8SNC/IgQPyLEjwjxI0L8iBA/IsSPCPEzLnzcHjZoOWwfrYUvZVVqvNSrLqyEz1mlU8zoKvs2L/y2QvU10asBsS/8mSEDa2L2c0aYVNxr9EzVP4s94avGLmFdRP1qFP66llCpFV6Uelt79csoPJaNj3ut5DTG8mgUNs8Z7mV6pXnWGIWpxgbWRJ0ahVpzr9A7WpuFuGfwI8osRN+jTcy7FL+EdRH/cyH36oJEhPgRIX5EiB8R4keE+BEhfkSIHxHiR4T4ESF+RIgfEeJHhPgRIX5EiB8R4keE+BEhfkSIHxHiR4T4ESF+RIifJYVx/HnqksJ9FMTlhOmxiIK4mFDdF0lxiIC4lFDtiyRJioyfuJBQPSXXZOGWSsxCws07sNiFWyoxCwmTJBriMsJt8UU8Mh/FJYTq9AWsiSde4gLC9L4NrIn3rMTwQnXoAmsia+cPLvzsE23iEyMxuHAzBDZtkY8YXLjr79FrNqEXbp3AQrUdBzK2xbDCbp/oELdc+zSoUF2mgIydP6Rw2Cc6RKbOH1CoMhOwJl5YiAGF432iTWS5EAcUns0lTJguxMGE6jgLTFg6fyhhOtknOkXc/fvOH0h4fS1jQyQWkf6NnDBC9WQHJHd+dSQ/pYIIVWbpS4htsT7k5AdxEOFmZy8kXYibpxiVGEKo5vtEh+h8Ib6O80RiAKFdn2gTHS/EH/cVGtFfqO4dgYljW/y6kJGI3kLzuD0Vh7bYPgIUoq9wbtwej8OFuPvOgED0FTr0ic5Kz3bL2/RfirgTfYUTr2XmiVYX4iuwaOdl/0+FU69lbIgWnb8BFi/J6bJvJy0dUvkJU9c+0SHOXYjVJqmBJ537pHrwEZpey9gQzUeqGQWLXZrnd/Tkuv+JVichrU+0Y+r8NbAotnc+vru8nPsGrRlIfIy2M9353/73nSewv0UdhbOvZWwy1fnfgIXyrODzAOgkpPaJdqY6/9vPO8XJDzg4g25C53F7gjh6Ib7+fuVXwrwaAzoIU5croYk40hY/3hj4Ab+PARmE9YW4/4XNd2Bx9BDmeuQMMgkHF2J1+KDTheNn0FF4DiXsXYg/u6yHcKxNMNYw6bTFrzGCLszLH1NAnhomrbbYeu9KFk5vUb4afrbF9otlqnBkVIughu8X4rQ9yhOFU22Ct4ZNa1j17yo0Ya4nHzK8wrrzp72XdiSh8Qxy7tIGdBn8sZi7MK8mGn0ENWzexvT+7S7MS+MZ5BYOxM7CyVEtjl3qL5w9g+g1NIxqtyE0jWo0YWS71GqLItfQPKrdgHBmVKMJY9qlNm0Cuoa2ZxBWOD+q0YTR7FKLUQ27hi5bFFJo3SbchXHs0ryymmRwazh3o4evoeMZxKvh6M9nt1RD+1ENtIYOoxqmkHAGHYXMu9TuRu9XwyC/AVOFbqMaSaiO24Vz3k8LiVvUSbhSi6c0VJAKjOv7NHr6DBK3KIrQfVQDE9LPIIjQ6UaPKCS3CRQhbVQDEvqdQQAhdVSDEVr++IIr9N+ikQs9RjUMoc+oBiH0bhOxC4OcwZiFnqNa/ELfUS16YbAtOhTyfthRf1YwHLAvPPf/yJxD6Pzji4vwUfMLvW70s0Leg6hDn8Ex4QtnEfUd7ccXJ+H6wHgSdbBRzSR8yPiIOtioZhKufxzYNqoOfQbHhev1b6VT+tdhPFL53+jthOv1n+SScSRkHzQLbykixI8I8SNC/IgQPyLEjwjxI0L8iBA/IsSPCPEjQvyIED8ixM/tC/8C45remhS6dPsAAAAASUVORK5CYII=",
            content: {},
            isApproved: user.isModerator,
          });

          savedArticle = await article.save();
        }
      } catch (err) {
        throw Error(err.message);
      }
      return {
        _id: savedArticle._id,
        title: savedArticle.title,
        author: savedArticle.author,
        authorId: savedArticle.authorId,
        date: savedArticle.date,
        image: savedArticle.image,
        isApproved: savedArticle.isApproved,
        content: JSON.stringify(savedArticle.content),
        comments: savedArticle.comments.map((comment) => ({
          _id: comment._id,
          authorId: comment.authorID,
          author: comment.author,
          content: JSON.stringify(comment.content),
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        })),
      };
    },

    editArticle: async (parent, args, ctx) => {
      const { authData } = ctx;
      if (!authData) {
        throw Error("Please login to proceed");
      }
      let editedArticle;
      try {
        const user = await User.findById(authData._id);
        const article = await Article.findById(args._id);
        if (
          !user ||
          (!user.isModerator && !user._id.equals(article.authorId))
        ) {
          throw Error("User not authorized to edit file");
        } else {
          article.title = args.title || article.title;
          article.author = args.author || article.author;
          article.date = args.date || article.date;
          article.image = args.image || article.image;
          article.content = JSON.stringify(args.content) || article.content;
          article.isApproved = user.isModerator;
          editedArticle = await article.save();
        }
      } catch (err) {
        throw Error(err.message);
      }
      return {
        _id: editedArticle._id,
        title: editedArticle.title,
        author: editedArticle.author,
        authorId: editedArticle.authorId,
        date: editedArticle.date,
        image: editedArticle.image,
        isApproved: editArticle.isApproved,
        content: JSON.stringify(editedArticle.content),
        comments: editedArticle.comments.map((comment) => ({
          _id: comment._id,
          authorId: comment.authorID,
          author: comment.author,
          content: JSON.stringify(comment.content),
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        })),
      };
    },

    postComment: async (parent, args, ctx) => {
      const { authData } = ctx;
      if (!authData) {
        throw Error("Please login to proceed");
      }
      let editedArticle;
      try {
        const article = await Article.findById(args._id);
        const user = await User.findById(authData._id);
        const comment = new Comment({
          authorID: user._id,
          author: `${user.firstName} ${user.lastName}`,
          content: JSON.parse(args.content),
        });
        article.comments.unshift(comment);
        editedArticle = await article.save();
      } catch (err) {
        throw Error(err.message);
      }
      return {
        _id: editedArticle._id,
        title: editedArticle.title,
        author: editedArticle.author,
        authorId: editedArticle.authorId,
        date: editedArticle.date,
        image: editedArticle.image,
        isApproved: editArticle.isApproved,
        content: JSON.stringify(editedArticle.content),
        comments: editedArticle.comments.map((comment) => ({
          _id: comment._id,
          authorId: comment.authorID,
          author: comment.author,
          content: JSON.stringify(comment.content),
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        })),
      };
    },
  },
};
