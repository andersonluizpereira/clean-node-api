const { MissingParamError } = require('../../utils/errors')
const AddUseCase = require('./add-usecase')

const makeEncrypterGenerator = () => {
  class EncrypterGeneratorSpy {
    async hash (value, salt) {
      this.value = value
      this.salt = salt
      return this.digest
    }
  }
  const encrypterGeneratorSpy = new EncrypterGeneratorSpy()
  encrypterGeneratorSpy.digest = 'any_token'
  return encrypterGeneratorSpy
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

const makeEncrypterGeneratorWithError = () => {
  class EncrypterGeneratorSpy {
    async generate () {
      throw new Error()
    }
  }
  return new EncrypterGeneratorSpy()
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
  const encrypterGeneratorSpy = makeEncrypterGenerator()
  const updateAccessTokenRepositorySpy = makeUpdateAccessTokenRepository()
  const sut = new AddUseCase({
    loadUserByEmailRepository: loadUserByEmailRepositorySpy,
    addUserRepository: addUserRepositorySpy,
    updateAccessTokenRepository: updateAccessTokenRepositorySpy,
    encrypter: encrypterGeneratorSpy
  })
  return {
    sut,
    loadUserByEmailRepositorySpy,
    addUserRepositorySpy,
    encrypterGeneratorSpy,
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
    expect(user).toBeTruthy()
    expect(user.email).toBe('any_email@mail.com')
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
    const tokenGenerator = makeEncrypterGenerator()
    const suts = [].concat(
      new AddUseCase({
        addUserRepository: makeAddUserRepositoryWithError()
      }),
      new AddUseCase({
        addUserRepository,
        tokenGenerator: makeEncrypterGeneratorWithError()
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
