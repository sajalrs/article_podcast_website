export const typeDefs = gql`
  type YoutubeLink {
    title: String!
    id: String!
    date: String!
  }

  type Query {
    youtubeLinks: [YoutubeLink]!
  }
`;