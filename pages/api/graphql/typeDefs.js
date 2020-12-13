import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type YoutubeLink {
    _id: ID!
    title: String!
    id: String!
    date: String!
  }
  
  type AuthData {
    token: String!
  }

  type Podcast{
      title: String!
      by: String!
      link: String!
      data: String!
      image: String!
      description: String!
  }

  type Query {
    youtubeLinks: [YoutubeLink!]!
    podcasts: [Podcast!]!
    login(email: String!, password: String!): AuthData!
  }
`;

