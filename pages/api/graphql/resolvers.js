const mongoose = require("mongoose");
const fetch = require("node-fetch");
var parser = require("xml2json");
import { serialize } from "cookie";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginValidation } = require("../validation/validation");

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

    isLoggedIn: async (_, args, ctx) => {
      const {authData} = ctx;
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

    login: async (_, args, ctx) => {
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
  },

};
