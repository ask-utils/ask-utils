const assert = require('power-assert')
const utils = require('../../../../libs/system/api')
const { handlerInput } = require('../../../handlerInput')

describe('libs/system/api.js', () => {
  describe('#getApiEndPoint()', () => {
    it('should return api endpoint', () => {
      const api = utils.getApiEndPoint(handlerInput)
      assert.equal(api, 'https://api.amazonalexa.com')
    })
  })
  describe('#getApiAccessToken()', () => {
    it('should return api access token', () => {
      const token = utils.getApiAccessToken(handlerInput)
      assert.equal(token, 'xxxxxxxx')
    })
  })
})
