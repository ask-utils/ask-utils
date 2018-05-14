const assert = require('power-assert')
const utils = require('../../../libs/intentHandlers')
const { handlerInput } = require('../../handlerInput')

describe('libs/intentHandlers.js', () => {
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
