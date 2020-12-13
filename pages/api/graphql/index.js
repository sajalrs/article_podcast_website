import { ApolloServer } from "apollo-server-micro";
require("dotenv/config");
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import connectDb from "../middlewares/dbMiddleware.js";
import verify from "../verification/verifyTokenGraphql"
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => ({ req, res }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default connectDb(verify(apolloServer.createHandler({ path: "/api/graphql" })));
