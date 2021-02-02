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

const makeAddUserRepositoryWithError = () => {
  class AddUserRepositorySpy {
    async add () {
      throw new Error()
    }
  }
  return new AddUserRepositorySpy()
}

const makeTokenGeneratorWithError = () => {
  class TokenGeneratorSpy {
    async generate () {
      throw new Error()
    }
  }
  return new TokenGeneratorSpy()
}

const makeUpdateAccessTokenRepositoryWithError = () => {
  class UpdateAccessTokenRepositorySpy {
    async update () {
      throw new Error()
    }
  }
  return new UpdateAccessTokenRepositorySpy()
}

const makeLoadUserByEmailRepository = () => {
  class LoadUserByEmailRepositorySpy {
    async load (email) {
      this.email = email
      return this.user
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  loadUserByEmailRepositorySpy.user = {
    id: 'any_id',
    password: 'hashed_password'
  }
  return loadUserByEmailRepositorySpy
}

const makeLoadUserByEmailRepositoryWithError = () => {
  class LoadUserByEmailRepositorySpy {
    async load () {
      throw new Error()
    }
  }
  return new LoadUserByEmailRepositorySpy()
}

const makeSut = () => {
  const addUserRepositorySpy = makeAddUserRepository()
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepository()
  const tokenGeneratorSpy = makeTokenGenerator()
  const updateAccessTokenRepositorySpy = makeUpdateAccessTokenRepository()
  const sut = new AddUseCase({
    loadUserByEmailRepository: loadUserByEmailRepositorySpy,
    addUserRepository: addUserRepositorySpy,
    updateAccessTokenRepository: updateAccessTokenRepositorySpy,
    tokenGenerator: tokenGeneratorSpy
  })
  return {
    sut,
    loadUserByEmailRepositorySpy,
    addUserRepositorySpy,
    tokenGeneratorSpy,
    updateAccessTokenRepositorySpy
  }
}

describe('Add UseCase', () => {
  test('Should throw if no email is provided', async () => {
    const { sut } = makeSut()
    const user = {
      email: '',
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

  test('Should call AddUserRepository with correct values', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    const data = {
      email: 'any_email@mail.com',
      password: 'hashed_password'
    }
    jest.spyOn(loadUserByEmailRepositorySpy, 'load').mockReturnValueOnce(null)
    const user = await sut.add(data)
    expect(user.email).toBe('any_email@mail.com')
    expect(user.password).toBe('any_token')
  })

  test('Should throw if any dependency throws return null', async () => {
    const { sut } = makeSut()
    const data = {
      email: 'any_email@mail.com',
      password: 'hashed_password'
    }
    const user = await sut.add(data)
    expect(user).toBeNull()
  })

  test('Should throw if any dependency throws', async () => {
    const addUserRepository = makeAddUserRepository()
    const tokenGenerator = makeTokenGenerator()
    const suts = [].concat(
      new AddUseCase({
        addUserRepository: makeAddUserRepositoryWithError()
      }),
      new AddUseCase({
        addUserRepository,
        tokenGenerator: makeTokenGeneratorWithError()
      }),
      new AddUseCase({
        addUserRepository,
        tokenGenerator,
        updateAccessTokenRepository: makeUpdateAccessTokenRepositoryWithError()
      }),
      new AddUseCase({
        loadUserByEmailRepositorySpy: makeLoadUserByEmailRepositoryWithError(),
        addUserRepository,
        tokenGenerator,
        updateAccessTokenRepository: makeUpdateAccessTokenRepositoryWithError()
      })
    )
    const data = {
      email: 'any_email@mail.com',
      password: 'hashed_password'
    }
    for (const sut of suts) {
      const promise = sut.add(data)
      expect(promise).rejects.toThrow()
    }
  })
})
