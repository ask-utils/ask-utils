const assert = require('power-assert')
const utils = require('../../index')

describe('index.js', () => {
  describe('Class/Translations', () => {
    it('should has Translations class', () => {
      console.log(Object.keys(utils))
      assert.notEqual(Object.keys(utils).indexOf('Translations'), -1)
    })
  })
  describe('intentHandlers', () => {
    describe('deprecate way', () => {
      const { intentHandlers } = utils
      const handlerKeys = Object.keys(intentHandlers)
      it('should has isHandledIntent() function on intentHandlers params', () => {
        assert.notEqual(handlerKeys.indexOf('isHandledIntent'), -1)
      })
      it('should has isMatchedRequestType() function on intentHandlers params', () => {
        assert.notEqual(handlerKeys.indexOf('isMatchedRequestType'), -1)
      })
      it('should has isIntentRequest() function on intentHandlers params', () => {
        assert.notEqual(handlerKeys.indexOf('isIntentRequest'), -1)
      })
      it('should has canHandle() function on intentHandlers params', () => {
        assert.notEqual(handlerKeys.indexOf('canHandle'), -1)
      })
    })
    describe('basic way', () => {
      const handlerKeys = Object.keys(utils)
      it('should has isHandledIntent() function.', () => {
        assert.notEqual(handlerKeys.indexOf('isHandledIntent'), -1)
      })
      it('should has getLocale() function.', () => {
        assert.notEqual(handlerKeys.indexOf('getLocale'), -1)
      })
      it('should has isMatchedRequestType() function.', () => {
        assert.notEqual(handlerKeys.indexOf('isMatchedRequestType'), -1)
      })
      it('should has isIntentRequest() function.', () => {
        assert.notEqual(handlerKeys.indexOf('isIntentRequest'), -1)
      })
      it('should has canHandle() function.', () => {
        assert.notEqual(handlerKeys.indexOf('canHandle'), -1)
      })
    })
  })
  describe('randomResponse', () => {
    describe('deprecate way', () => {
      const { randomResponse } = utils
      const handlerKeys = Object.keys(randomResponse)
      it('should has getRandomMessage() function on randomResponse params', () => {
        assert.notEqual(handlerKeys.indexOf('getRandomMessage'), -1)
      })
    })
    describe('basic way', () => {
      const handlerKeys = Object.keys(utils)
      it('should has getRandomMessage() function', () => {
        assert.notEqual(handlerKeys.indexOf('getRandomMessage'), -1)
      })
    })
  })
  describe('slotManager', () => {
    describe('deprecate way', () => {
      const { slotManager } = utils
      const handlerKeys = Object.keys(slotManager)
      it('should has getSlotByName() function on slotManager params', () => {
        assert.notEqual(handlerKeys.indexOf('getSlotByName'), -1)
      })
    })
    describe('basic way', () => {
      const handlerKeys = Object.keys(utils)
      it('should has getSlotByName() function', () => {
        assert.notEqual(handlerKeys.indexOf('getSlotByName'), -1)
      })
    })
  })
  describe('Test Util', () => {
    it('Should has getHandlerInput() function', () => {
      assert.notEqual(Object.keys(utils).indexOf('getHandlerInput'), -1)
    })
    it('should has getRequestEnvelopeMock() function', () => {
      assert.notEqual(Object.keys(utils).indexOf('getRequestEnvelopeMock'), -1)
    })
  })
  describe('get request param functions', () => {
    const handlerKeys = Object.keys(utils)
    it('Should has getDeviceId() function', () => {
      assert.notEqual(handlerKeys.indexOf('getDeviceId'), -1)
    })
    it('Should has supportsDisplay() function', () => {
      assert.notEqual(handlerKeys.indexOf('supportsDisplay'), -1)
    })
    it('Should has getSupportedInterfaces () function', () => {
      assert.notEqual(handlerKeys.indexOf('getSupportedInterfaces'), -1)
    })
  })
  describe('get response functions', () => {
    const handlerKeys = Object.keys(utils)
    it('should has getErrorMessage() function', () => {
      assert.notEqual(handlerKeys.indexOf('getErrorMessage'), -1)
    })
  })
  describe('progressive response', () => {
    const handlerKeys = Object.keys(utils)
    it('should has enqueueProgressiveResponseDirective() function', () => {
      assert.notEqual(handlerKeys.indexOf('enqueueProgressiveResponseDirective'), -1)
    })
  })
  describe('isp functions', () => {
    const handlerKeys = Object.keys(utils)
    it('should has getSpeakableListOfProducts() function', () => {
      assert.notEqual(handlerKeys.indexOf('getSpeakableListOfProducts'), -1)
    })
  })
})
