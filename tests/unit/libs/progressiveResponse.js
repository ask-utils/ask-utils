const assert = require('power-assert')
const enqueueProgressiveResponseDirective = require('../../../libs/progressiveResponse')
const { getHandlerInput, getRequestEnvelopeMock } = require('../../../libs/testUtils')
const handlerInput = getHandlerInput(getRequestEnvelopeMock())

describe('libs/progressiveResponse.js', () => {
  describe('#enqueueProgressiveResponseDirective()', () => {
    it('should return true when given matched intent name', () => {
      const result = enqueueProgressiveResponseDirective(handlerInput, 'hello')
      assert.deepEqual(result, {
        directive: {
          directive: {
            speech: 'hello',
            type: 'VoicePlayer.Speak'
          },
          header: {
            requestId: handlerInput.requestEnvelope.request.requestId
          }
        },
        endpoint: 'https://api.amazonalexa.com',
        token: 'exampleAccessToken'
      })
    })
  })
})
