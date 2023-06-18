import { ApolloServer, gql } from 'apollo-server';

type User = {
  name: string;
};

const typeDefs = gql`
  type Query {
    helloWorld: String!
    users: [String!]!
  }

  type Mutation {
    createUser(name: String!): String!
  }
`;

const users: string[] = [];

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      helloWorld: () => {
        return `Hello world!`;
      },
      users: () => users,
    },
    Mutation: {
      createUser: (parent, args, context: User) => {
        console.log(args);

        return users.push(args.name);
      },
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`Server running on ${url}`);
});
