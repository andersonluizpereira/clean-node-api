const AddUserRouter = require('../../presentation/routers/add-user-router')
const AddUseCase = require('../../domain/usecases/add-usecase')
const EmailValidator = require('../../utils/helpers/email-validator')
const AddUserRepository = require('../../infra/repositories/add-user-repository')
const LoadUserByEmailRepository = require('../../infra/repositories/load-user-by-email-repository')
const UpdateAccessTokenRepository = require('../../infra/repositories/update-access-token-repository')
const Encrypter = require('../../utils/helpers/encrypter')

module.exports = class AddUserRouterComposer {
  static compose () {
    const addUserRepository = new AddUserRepository()
    const loadUserByEmailRepository = new LoadUserByEmailRepository()
    const updateAccessTokenRepository = new UpdateAccessTokenRepository()
    const emailValidator = new EmailValidator()
    const encrypter = new Encrypter()
    const addUseCase = new AddUseCase({
      loadUserByEmailRepository,
      addUserRepository,
      updateAccessTokenRepository,
      encrypter
    })
    return new AddUserRouter({
      addUseCase,
      emailValidator
    })
  }
}
