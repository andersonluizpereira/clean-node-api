/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  mutate: ['src/domain/usecases/*.js', '!src/domain/usecases/*.spec.js'],
  reporters: ['html', 'clear-text'],
  testRunner: 'jest',
  jest: {
    enableFindRelatedTests: false
  }
}
