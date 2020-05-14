const jwt = require('jwt-simple');
const { PrismaClient } = require('@prisma/client');

const { SECRET_JWT } = require('./config/constanst');

const prisma = new PrismaClient();

function getUser(token) {
  return jwt.decode(token, SECRET_JWT);
}

function createContext({ req }) {
  const token = req.headers.authorization || null;
  const user = token ? getUser(token) : null;
  return { prisma, user }
}

module.exports = {
  createContext
}
