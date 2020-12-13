import { ApolloServer } from "apollo-server-micro";
require("dotenv/config");
import {typeDefs} from "./typeDefs";
import {resolvers}  from "./resolvers";
import connectDb from "../middlewares/dbMiddleware.js";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});


export const config = {
  api: {
    bodyParser: false,
  },
}

export default connectDb(apolloServer.createHandler({ path: "/api/graphql" }));
