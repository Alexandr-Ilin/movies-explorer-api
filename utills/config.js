require('dotenv').config();

const {
  NODE_ENV,
  PORT = 3000,
  MONGO_PORT = 'mongodb://localhost:27017/moviesdb',
  JWT_SECRET = 'dev-secret',
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  MONGO_PORT,
  JWT_SECRET,
};
