const AddUserRouter = require('../../presentation/routers/add-user-router')
const AddUseCase = require('../../domain/usecases/add-usecase')
const EmailValidator = require('../../utils/helpers/email-validator')
const AddUserRepository = require('../../infra/repositories/add-user-repository')
const LoadUserByEmailRepository = require('../../infra/repositories/load-user-by-email-repository')
const UpdateAccessTokenRepository = require('../../infra/repositories/update-access-token-repository')

module.exports = class AddUserRouterComposer {
  static compose () {
    const addUserRepository = new AddUserRepository()
    const loadUserByEmailRepository = new LoadUserByEmailRepository()
    const updateAccessTokenRepository = new UpdateAccessTokenRepository()
    const emailValidator = new EmailValidator()
    const addUseCase = new AddUseCase({
      loadUserByEmailRepository,
      addUserRepository,
      updateAccessTokenRepository
    })
    return new AddUserRouter({
      addUseCase,
      emailValidator
    })
  }
}
