const { MissingParamError } = require('../../utils/errors')

module.exports = class AddUseCase {
  constructor ({ loadUserByEmailRepository, addUserRepository, updateAccessTokenRepository, tokenGenerator }) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.addUserRepository = addUserRepository
    this.updateAccessTokenRepository = updateAccessTokenRepository
    this.tokenGenerator = tokenGenerator
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
      data.password = await this.tokenGenerator.generate(data.password)
      const user = await this.addUserRepository.add(data)
      const accessToken = await this.tokenGenerator.generate(user.id)
      await this.updateAccessTokenRepository.update(user.id, accessToken)
      return user
    }
    return null
  }
}
