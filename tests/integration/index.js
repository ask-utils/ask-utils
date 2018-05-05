const assert = require('power-assert')
const utils = require('../../index')

describe('index.js', () => {
  describe('intentHandlers', () => {
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
  describe('randomResponse', () => {
    const { randomResponse } = utils
    const handlerKeys = Object.keys(randomResponse)
    it('should has getRandomMessage() function on randomResponse params', () => {
      assert.notEqual(handlerKeys.indexOf('getRandomMessage'), -1)
    })
  })
  describe('slotManager', () => {
    const { slotManager } = utils
    const handlerKeys = Object.keys(slotManager)
    it('should has getSlotByName() function on slotManager params', () => {
      assert.notEqual(handlerKeys.indexOf('getSlotByName'), -1)
    })
  })
})
