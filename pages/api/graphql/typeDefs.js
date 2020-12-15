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

  type Podcast {
    title: String!
    by: String!
    link: String!
    data: String!
    image: String!
    description: String!
  }

  type Comment {
    _id: ID!
    authorId: String!
    author: String!
    content: String!
    createdAt: String!
    updatedAt: String!
  }

  type Article {
    _id: ID!
    title: String!
    author: String!
    authorId: String!
    date: String!
    image: String!
    content: String!
    comments: [Comment]!
  }

  type Query {
    youtubeLinks: [YoutubeLink!]!
    podcasts: [Podcast!]!
    isLoggedIn: User
    login(email: String!, password: String!): AuthData!
    logout: Boolean!
    forgotPassword(email: String!): Boolean!
    articles: [Article!]!
    article(_id: String): Article!
  }

  type Mutation {
    register(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      isSubscribed: Boolean
    ): User!
    subscribe(isSubscribed: Boolean!): User!
    resetPassword(_id: String!, token: String!, password: String!): User
  }
`;
