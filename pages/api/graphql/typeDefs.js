import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type YoutubeLink {
    _id: ID!
    title: String!
    id: String!
    date: String!
  }

  type Query {
    youtubeLinks: [YoutubeLink!]!,
    hello: String!
  }
`;

// export const typeDefs = gql`
//   type Query {
//     hello: String!
//   }
// `;
