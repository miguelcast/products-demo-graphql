const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        users: [User!]
        products: [Product!]
    }

    type User {
        id: ID!
        name: String!
        email: String!
        role: String
    }
  
    type Product {
        id: ID!
        name: String
        image: String
        description: String
    }
`;

const resolvers = {
  Query: {
    users(parent, args, context) {
      return context.prisma.user.findMany();
    },
    products(parent, args, context) {
      return context.prisma.product.findMany();
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
