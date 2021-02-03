
const HttpResponse = require('../helpers/http-response')
const { MissingParamError, InvalidParamError } = require('../../utils/errors')

module.exports = class AddUserRouter {
  constructor ({ addUseCase, emailValidator } = {}) {
    this.addUseCase = addUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'))
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }
      const user = await this.addUseCase.add(httpRequest.body)
      return HttpResponse.ok(user)
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
