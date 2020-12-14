import { ApolloServer } from "apollo-server-micro";
require("dotenv/config");
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import connectDb from "../middlewares/dbMiddleware.js";
import withCookies from "../middlewares/cookiesMiddleware";
import verify from "../verification/verifyTokenGraphql";

const context = (ctx) => {
  return {
    cookie: ctx.res.cookie,
    authData: ctx.req.authData
  };
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withCookies(
  connectDb(verify(apolloServer.createHandler({ path: "/api/graphql" })))
);
