const { gql } = require('apollo-server');
const jwt = require('jwt-simple');

const { SECRET_JWT } = require('./config/constanst');

const typeDefs = gql`
    type Query {
        users: [User!]
        products: [Product!]
    }
    
    type Mutation {
        login(email: String!): Login
        upsertUser(id: ID, name: String, email: String, role: Role): User
        upsertProduct(id: ID, name: String, image: String, description: String): Product
    }

    enum Role {
        USER
        ADMIN
    }
    
    type User {
        id: ID!
        name: String
        email: String!
        role: Role
    }

    type Login {
        token: String
        user: User
    }
  
    type Product {
        id: ID!
        name: String!
        image: String!
        description: String!
    }
`;

const resolvers = {
  Query: {
    users(parent, args, { prisma, user }) {
      return prisma.user.findMany();
    },
    products(parent, args, { prisma }) {
      return prisma.product.findMany();
    }
  },
  Mutation: {
    async login(parent, { email }, { prisma }) {
      const user = await prisma.user.findOne({ where: { email } });
      return {
        user,
        token: user ? jwt.encode(user, SECRET_JWT) : null
      }
    },
    upsertUser(parent, { id, ...data }, { prisma }) {
      return prisma.user.upsert({
        update: data,
        where: { id: Number(id) || 0 }, // dont work where: { id } with id undefined
        create: data,
      });
    },
    upsertProduct(parent, { id, ...data }, { prisma }) {
      return prisma.product.upsert({
        update: data,
        where: { id: Number(id) || 0 },
        create: data,
      });
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
