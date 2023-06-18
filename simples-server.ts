//Schema first

import { ApolloServer, gql } from 'apollo-server';
import { randomUUID } from 'node:crypto';

interface User {
  id: string;
  name: string;
}

const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }

  type Query {
    helloWorld: String!
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!): User!
  }
`;

const users: User[] = [];

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
      createUser: (__parent, args, __context: User) => {
        const user: User = { id: randomUUID(), name: args.name };

        users.push(user);

        return user;
      },
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`Server running on ${url}`);
});
