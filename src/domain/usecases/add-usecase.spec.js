const { MissingParamError } = require('../../utils/errors')
const AddUseCase = require('./add-usecase')

const makeTokenGenerator = () => {
  class TokenGeneratorSpy {
    async generate (userId) {
      this.userId = userId
      return this.accessToken
    }
  }
  const tokenGeneratorSpy = new TokenGeneratorSpy()
  tokenGeneratorSpy.accessToken = 'any_token'
  return tokenGeneratorSpy
}

const makeAddUserRepository = () => {
  class AddUserRepositorySpy {
    async add (data) {
      this.user = data
      return this.user
    }
  }
  const addUserRepositorySpy = new AddUserRepositorySpy()
  addUserRepositorySpy.user = {
    id: 'any_id',
    password: 'hashed_password'
  }
  return addUserRepositorySpy
}

const makeUpdateAccessTokenRepository = () => {
  class UpdateAccessTokenRepositorySpy {
    async update (userId, accessToken) {
      this.userId = userId
      this.accessToken = accessToken
    }
  }
  return new UpdateAccessTokenRepositorySpy()
}

const makeSut = () => {
  const addUserRepositorySpy = makeAddUserRepository()
  const tokenGeneratorSpy = makeTokenGenerator()
  const updateAccessTokenRepositorySpy = makeUpdateAccessTokenRepository()
  const sut = new AddUseCase({
    addUserRepository: addUserRepositorySpy,
    updateAccessTokenRepository: updateAccessTokenRepositorySpy,
    tokenGenerator: tokenGeneratorSpy
  })
  return {
    sut,
    addUserRepositorySpy,
    tokenGeneratorSpy,
    updateAccessTokenRepositorySpy
  }
}

describe('Add UseCase', () => {
  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const user = {
      password: 'hashed_password'
    }
    const promise = sut.add(user)
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provided', async () => {
    const { sut } = makeSut()
    const user = {
      email: 'any_email@mail.com'
    }
    const promise = sut.add(user)
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })
})
