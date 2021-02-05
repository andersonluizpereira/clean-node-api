const bcrypt = require('bcrypt')
const MissingParamError = require('../errors/missing-param-error')

module.exports = class Encrypter {
  constructor (salt) {
    this.salt = salt
  }

  async compare (value, hash) {
    if (!value) {
      throw new MissingParamError('value')
    }
    if (!hash) {
      throw new MissingParamError('hash')
    }
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }

  async hash (value, salt) {
    if (!value) {
      throw new MissingParamError('value')
    }
    if (!salt) {
      throw new MissingParamError('salt')
    }
    const digest = await bcrypt.hash(value, salt)
    return digest
  }
}
