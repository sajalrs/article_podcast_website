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

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    isSubscribed: Boolean!
    isModerator: Boolean!
    password: String!
    createdAt: String!
    updatedAt: String!
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
    isLoggedIn: User
  }
`;

