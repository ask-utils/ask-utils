const assert = require('power-assert')
const { getConsentToken } = require('../../../../libs/system/users')
const { handlerInput } = require('../../../handlerInput')

describe('libs/system/users.js', () => {
  describe('#getConsentToken()', () => {
    it('should return empty param for default', () => {
      const result = getConsentToken(handlerInput)
      assert.equal(result, '')
    })
    it('should return permission string param when given valid param', () => {
      const event = handlerInput
      event.requestEnvelope.context.System.user.permissions = 'test'
      const result = getConsentToken(event)
      assert.equal(result, 'test')
    })
  })
})
