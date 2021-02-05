module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  tokenSecret: process.env.TOKEN_SECRET || 'secret',
  salt: process.env.SALT || 12,
  port: process.env.PORT || 5859
}
