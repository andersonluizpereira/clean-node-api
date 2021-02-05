const { MissingParamError } = require('../../utils/errors')
const env = require('../../main/config/env')

module.exports = class AddUseCase {
  constructor ({ loadUserByEmailRepository, addUserRepository, updateAccessTokenRepository, encrypter }) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.addUserRepository = addUserRepository
    this.updateAccessTokenRepository = updateAccessTokenRepository
    this.encrypter = encrypter
  }

  async add (data) {
    if (!data.email) {
      throw new MissingParamError('email')
    }

    if (!data.password) {
      throw new MissingParamError('password')
    }
    const account = await this.loadUserByEmailRepository.load(data.email)
    if (!account) {
      data.password = await this.encrypter.hash(data.password, env.salt)
      data.passwordConfirmation = data.password
      const user = await this.addUserRepository.add(data)
      return user
    }
    return null
  }
}
