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
    date: String!
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
    content: String
    isApproved: Boolean!
    comments: [Comment]!
  }

  type Message {
    _id: ID!
    firstName: String!
    lastName: String!
    subject: String!
    content: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    youtubeLinks: [YoutubeLink!]
    podcasts: [Podcast!]
    isLoggedIn: User
    login(email: String!, password: String!): AuthData!
    logout: Boolean!
    forgotPassword(email: String!): Boolean!
    articles: [Article!]
    article(_id: String!): Article
    messages: [Message!]
    message(_id: String!): Message
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
    createArticle: Article!
    editArticle(
      _id: String!
      title: String
      author: String
      date: String
      image: String
      content: String
    ): Article
    postComment(_id: String!, content: String): Article
    createMessage(
      firstName: String!
      lastName: String!
      email: String!
      subject: String!
      content: String
    ): Message!
  }
`;
