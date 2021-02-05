jest.mock('bcrypt', () => ({
  isValid: true,
  digest: 'any_hash',

  async compare (value, hash) {
    this.value = value
    this.hash = hash
    return this.isValid
  },
  async hash (value, salt) {
    this.value = value
    this.salt = salt
    return this.digest
  }
}))

const bcrypt = require('bcrypt')
const MissingParamError = require('../errors/missing-param-error')
const Encrypter = require('./encrypter')

const makeSut = () => {
  return new Encrypter()
}

describe('Encrypter', () => {
  test('Should return hash', async () => {
    const sut = makeSut()
    const digest = await sut.hash('any_value', 12)
    expect(digest).toBe('any_hash')
  })

  test('Should return true if bcrypt returns true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBe(true)
  })

  test('Should return false if bcrypt returns false', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBe(false)
  })

  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    await sut.compare('any_value', 'hashed_value')
    expect(bcrypt.value).toBe('any_value')
    expect(bcrypt.hash).toBe('hashed_value')
  })

  test('Should throw if no params are provided', async () => {
    const sut = makeSut()
    expect(sut.compare()).rejects.toThrow(new MissingParamError('value'))
    expect(sut.compare('any_value')).rejects.toThrow(new MissingParamError('hash'))
  })

  test('Should throw if no params are provided hash', async () => {
    const sut = makeSut()
    expect(sut.hash()).rejects.toThrow(new MissingParamError('value'))
    expect(sut.hash('any_value')).rejects.toThrow(new MissingParamError('salt'))
  })
})
