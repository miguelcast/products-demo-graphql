const { ApolloServer } = require('apollo-server')
const { resolvers, typeDefs } = require('./schema')
const { createContext } = require('./context')

new ApolloServer({
  typeDefs, resolvers, context: createContext
}).listen(
  { port: 4000 },
  () =>
    console.log(
      `🚀 Server ready at: http://localhost:4000`,
    ),
)
