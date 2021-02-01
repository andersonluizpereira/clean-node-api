const MongoHelper = require('../helpers/mongo-helper')
const AddUserRepository = require('./add-user-repository')
let userModel

const makeSut = () => {
  return new AddUserRepository()
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('add()', () => {
    test('should be able to insert a new user', async () => {
      const sut = makeSut()
      const fakeUser = await sut.add({
        email: 'valid_email@mail.com',
        password: 'hashed_password'
      })
      expect(fakeUser).toBeTruthy()
      expect(fakeUser).toHaveProperty('id')
      expect(fakeUser.id).toBeTruthy()
    })
  })
})
