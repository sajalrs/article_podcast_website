import { ApolloServer, gql } from "apollo-server-micro";
import { makeExecutableSchema } from "graphql-tools";
import { MongoClient } from "mongodb";
require("dotenv/config");
const typeDefs = gql`
  type YoutubeLink {
    title: String!
    id: String!
    date: String!
  }

  type Query {
    youtubeLinks: [YoutubeLink]!
  }
`;

const resolvers = {
  Query: {
    youtubeLinks(_parent, _args, _context, _info) {
      return _context.db
        .collection("youtubelinks")
        .find().toArray()
        .then((data) => {
          return data;
        });
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

let db;
const apolloServer = new ApolloServer({
  schema,
  context: async () => {
    if (!db) {
      try {
        const dbClient = new MongoClient(process.env.MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        if (!dbClient.isConnected()) await dbClient.connect();
        db = dbClient.db("cluster0");
      } catch (e) {
        console.log("--->error while connecting via graphql context (db)", e);
      }
    }
    return { db };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
