const MongoHelper = require('../helpers/mongo-helper')

module.exports = class AddUserRepository {
  async add (data) {
    const userModel = await MongoHelper.getCollection('users')
    const result = await userModel.insertOne(data)
    const user = {
      id: result.ops[0]._id,
      name: result.ops[0].name,
      password: result.ops[0].password
    }
    return user
  }
}
