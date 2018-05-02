const assert = require('power-assert')
const utils = require('../../../libs/randomResponse')

describe('libs/randomResponse.js', () => {
  describe('#getRandomMessage()', () => {
    it('should return true when given matched intent name', () => {
      const messages = [
        'hello',
        'hi'
      ]
      const result = utils.getRandomMessage(messages)
      assert.notEqual(messages.indexOf(result), -1)
    })
  })
})
