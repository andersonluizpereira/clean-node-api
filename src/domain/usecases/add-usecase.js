const { MissingParamError } = require('../../utils/errors')

module.exports = class AddUseCase {
  constructor ({ addUserRepository, updateAccessTokenRepository, tokenGenerator } = {}) {
    this.addUserRepository = addUserRepository
    this.updateAccessTokenRepository = updateAccessTokenRepository
    this.tokenGenerator = tokenGenerator
  }

  async add (data) {
    try {
      if (!data.email) {
        throw new MissingParamError('email')
      }
      if (!data.password) {
        throw new MissingParamError('password')
      }
      data.password = await this.tokenGenerator.generate(data.password)
      const user = await this.addUserRepository.add(data)
      if (user) {
        const accessToken = await this.tokenGenerator.generate(user.id)
        await this.updateAccessTokenRepository.update(user.id, accessToken)
        return user
      }
    } catch (error) {
      return null
    }
  }
}
