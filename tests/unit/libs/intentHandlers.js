const assert = require('power-assert')
const utils = require('../../../libs/intentHandlers')
const { handlerInput } = require('../../handlerInput')

describe('libs/intentHandlers.js', () => {
  describe('#isNewSession()', () => {
    it('should return true when session new is true', () => {
      const input = {
        requestEnvelope: {
          session: {
            new: true
          }
        }
      }
      assert.equal(utils.isNewSession(input), true)
    })
    it('should return false when session new is false', () => {
      const input = {
        requestEnvelope: {
          session: {
            new: false
          }
        }
      }
      assert.equal(utils.isNewSession(input), false)
    })
    it('should return false when given invalid input', () => {
      const input = {
        requestEnvelope: {
        }
      }
      assert.equal(utils.isNewSession(input), false)
    })
  })
  describe('#getLocale()', () => {
    it('should return en-US for default', () => {
      const locale = utils.getLocale({})
      assert.equal(locale, 'en-US')
    })
    it('should return ja-JP if overwrite default locale', () => {
      const locale = utils.getLocale({}, 'ja-JP')
      assert.equal(locale, 'ja-JP')
    })
    it('should return ja-JP', () => {
      const locale = utils.getLocale(handlerInput)
      assert.equal(locale, 'ja-JP')
    })
    it('should return en-US', () => {
      handlerInput.requestEnvelope.request.locale = 'en-US'
      const locale = utils.getLocale(handlerInput)
      assert.equal(locale, 'en-US')
    })
  })
  describe('#isHandledIntent()', () => {
    it('should return true when given matched intent name', () => {
      handlerInput.requestEnvelope.request.intent.name = 'HelloWorldIntent'
      const result = utils.isHandledIntent(handlerInput, 'HelloWorldIntent')
      assert.equal(result, true)
    })
    it('should return false when given un-matched intent name', () => {
      handlerInput.requestEnvelope.request.intent.name = 'GoodbyeIntent'
      const result = utils.isHandledIntent(handlerInput, 'HelloWorldIntent')
      assert.equal(result, false)
    })
  })
  describe('#isMatchedRequestType()', () => {
    it('should return true when given matched request type', () => {
      handlerInput.requestEnvelope.request.type = 'IntentRequest'
      const result = utils.isMatchedRequestType(handlerInput, 'IntentRequest')
      assert.equal(result, true)
    })
    it('should return false when given un-matched request type', () => {
      handlerInput.requestEnvelope.request.type = 'SessionEndedRequest'
      const result = utils.isMatchedRequestType(handlerInput, 'IntentRequest')
      assert.equal(result, false)
    })
  })
  describe('#isIntentRequest()', () => {
    it('should return false when given SessionEndedRequest request type', () => {
      handlerInput.requestEnvelope.request.type = 'SessionEndedRequest'
      const result = utils.isIntentRequest(handlerInput)
      assert.equal(result, false)
    })
    it('should return true when given IntentRequest request type', () => {
      handlerInput.requestEnvelope.request.type = 'IntentRequest'
      handlerInput.requestEnvelope.request.intent.name = 'HelloWorldIntent'
      const result = utils.isIntentRequest(handlerInput)
      assert.equal(result, true)
    })
  })
  describe('#canHandle()', () => {
    beforeEach(() => {
      handlerInput.requestEnvelope.request.type = 'LaunchRequest'
      handlerInput.requestEnvelope.request.intent.name = 'HelloAlexaIntent'
    })
    it('should return true when given matched request type that is not IntentRequest', () => {
      const result = utils.canHandle(handlerInput, 'LaunchRequest')
      assert.equal(result, true)
    })
    it('should return false when given un-matched request type', () => {
      const result = utils.canHandle(handlerInput, 'IntentRequest', 'HelloAlexaIntent')
      assert.equal(result, false)
    })
    it('should return true when given matched intent name & request type', () => {
      handlerInput.requestEnvelope.request.type = 'IntentRequest'
      const result = utils.canHandle(handlerInput, 'IntentRequest', 'HelloAlexaIntent')
      assert.equal(result, true)
    })
    it('should return false when given un-matched intent name', () => {
      handlerInput.requestEnvelope.request.type = 'IntentRequest'
      handlerInput.requestEnvelope.request.intent.name = 'GoodbyeIntent'
      const result = utils.canHandle(handlerInput, 'IntentRequest', 'HelloAlexaIntent')
      assert.equal(result, false)
    })
  })
  describe('#isLaunchRequest()', () => {
    beforeEach(() => {
      handlerInput.requestEnvelope.request.type = 'LaunchRequest'
      handlerInput.requestEnvelope.request.intent.name = 'HelloAlexaIntent'
    })
    it('should return true when given matched request type', () => {
      const result = utils.isLaunchRequest(handlerInput)
      assert.equal(result, true)
    })
    it('should return true when given matched intent name & request type', () => {
      handlerInput.requestEnvelope.request.type = 'IntentRequest'
      const result = utils.isLaunchRequest(handlerInput)
      assert.equal(result, false)
    })
  })
  describe('#getRequest()', () => {
    it('should return request object', () => {
      const request = utils.getRequest(handlerInput)
      assert.deepEqual(request, handlerInput.requestEnvelope.request)
    })
    it('should return empty object when given invalid param', () => {
      const request = utils.getRequest({})
      assert.deepEqual(request, {})
    })
  })
  describe('#getDialogState()', () => {
    it('should return dialogState', () => {
      handlerInput.requestEnvelope.request.dialogState = 'START'
      const state = utils.getDialogState(handlerInput)
      assert.equal(state, 'START')
    })
    it('should return dialogState when given invalid param', () => {
      const state = utils.getDialogState({})
      assert.equal(state, '')
    })
  })
  describe('#getIntent()', () => {
    it('should return intent object', () => {
      const intent = utils.getIntent(handlerInput)
      assert.deepEqual(intent, handlerInput.requestEnvelope.request.intent)
    })
    it('should return intent object when given invalid param', () => {
      const intent = utils.getIntent({})
      assert.deepEqual(intent, {})
    })
  })
})
