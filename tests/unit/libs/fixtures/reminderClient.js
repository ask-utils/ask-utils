const assert = require('power-assert')
// target
const RemidnerClient = require('../../../../libs/fixtures/reminderClient')

describe('RemidnerClient', () => {
  const handlerInput = {
    requestEnvelope: {
      context: {
        System: {
          apiEndpoint: 'https://api.fe.amazonalexa.com',
          apiAccessToken: 'token'
        }
      }
    }
  }
  describe('#getRequestParams()', () => {
    const c = new RemidnerClient(handlerInput)
    it('should return valid response', () => {
      const params = c.getRequestParams()
      assert.deepEqual(params, {
        'headers': {
          'Authorization': 'Bearer token',
          'Content-Type': 'application/json;'
        },
        'json': true,
        'method': 'GET',
        'resolveWithFullResponse': true,
        'uri': 'https://api.fe.amazonalexa.com/v1/alerts/reminders'
      })
    })
    it('should return valid response', () => {
      const params = c.getRequestParams('POST')
      assert.deepEqual(params, {
        'body': {},
        'headers': {
          'Authorization': 'Bearer token',
          // 'Content-Length': 2,
          'Content-Type': 'application/json;'
        },
        'json': true,
        'method': 'POST',
        'resolveWithFullResponse': true,
        'uri': 'https://api.fe.amazonalexa.com/v1/alerts/reminders'
      })
    })
  })
  /*
  describe('#getHeader()', () => {
    const c = new RemidnerClient(handlerInput)
    c.setPayload({
      createdTime: '2018-10-25T19:04:00.672'
    })
    it('should return valid content length', () => {
      const length = c.getHeader(method)
    })
  })
  */
  describe('setPayload', () => {
    it('should return valid payload', () => {
      const c = new RemidnerClient(handlerInput)
      c.setPayload({})
      assert.deepEqual(c.getPayload(), {})
    })
    it('should return valid payload', () => {
      const c = new RemidnerClient(handlerInput)
      c.setPayload({
        createdTime: '2018-10-25T19:04:00.672'
      })
      assert.deepEqual(c.getPayload(), {
        createdTime: '2018-10-25T19:04:00.672'
      })
    })
    it('should return valid payload', () => {
      const c = new RemidnerClient(handlerInput)
      c.setPayload({
        createdTime: '2018-10-25T19:04:00.672'
      })
      const params = c.getRequestParams('POST')
      assert.deepEqual(params, {
        'body': {
          createdTime: '2018-10-25T19:04:00.672'
        },
        'headers': {
          'Authorization': 'Bearer token',
          // 'Content-Length': 41,
          'Content-Type': 'application/json;'
        },
        'json': true,
        'method': 'POST',
        'resolveWithFullResponse': true,
        'uri': 'https://api.fe.amazonalexa.com/v1/alerts/reminders'
      })
    })
  })
})
