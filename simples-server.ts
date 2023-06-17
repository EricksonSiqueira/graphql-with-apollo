import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    helloWorld: String!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      helloWorld: () => {
        return `Hello world!`;
      },
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`Server running on ${url}`);
});
