const assert = require('power-assert')
const { getHandlerInput } = require('../../../libs/testUtils')

describe('libs/testUtils.js', () => {
  describe('getHandlerInput', () => {
    it('should return objects has valid keys', () => {
      const event = {}
      const handlerInput = getHandlerInput(event)
      assert.deepEqual(Object.keys(handlerInput), [
        'requestEnvelope',
        'context',
        'attributesManager',
        'responseBuilder',
        'serviceClientFactory'
      ])
    })
    it('should return event param as requestEnvelope', () => {
      const event = {
        'request': {
          'type': 'IntentRequest',
          'requestId': 'amzn1.echo-api.request.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
          'timestamp': '2018-05-02T00:18:57Z',
          'locale': 'ja-JP',
          'intent': {
            'name': 'HelloWorldIntent',
            'confirmationStatus': 'NONE',
            'slots': {
              'date': {
                'name': 'date',
                'value': '2018-05-07',
                'confirmationStatus': 'NONE'
              }
            }
          }
        }
      }
      const handlerInput = getHandlerInput(event)
      assert.deepEqual(handlerInput.requestEnvelope, event)
    })
  })
})
