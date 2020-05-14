const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { resolvers, typeDefs } = require('./schema');
const { createContext } = require('./context');

const server = new ApolloServer({
  typeDefs, resolvers, context: createContext, playground: true, introspection: true
});

const app = express();
server.applyMiddleware({ app });

const port = process.env.PORT || 4000;

app.listen({ port: port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
);
