const { MissingParamError } = require('../../utils/errors')
const bcrypt = require('bcrypt')

module.exports = class AddUseCase {
  constructor ({ loadUserByEmailRepository, addUserRepository, updateAccessTokenRepository }) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.addUserRepository = addUserRepository
    this.updateAccessTokenRepository = updateAccessTokenRepository
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
      data.password = bcrypt.hashSync(data.password, 10)
      const user = await this.addUserRepository.add(data)
      return user
    }
    return null
  }
}
