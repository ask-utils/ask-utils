const assert = require('power-assert')
const utils = require('../../../../libs/system/device')
const { handlerInput } = require('../../../handlerInput')

describe('libs/system/device.js', () => {
  describe('#getDeviceId()', () => {
    it('should return device id', () => {
      const id = utils.getDeviceId(handlerInput)
      assert.equal(id, 'amzn1.ask.device.xxxxx')
    })
    it('should return empty string when device id does not defined', () => {
      const id = utils.getDeviceId({})
      assert.equal(id, '')
    })
  })
  describe('#supportsDisplay()', () => {
    it('should return true when given from supported display', () => {
      const result = utils.supportsDisplay(handlerInput)
      assert.equal(result, true)
    })
    it('should return false when given from un-supported display', () => {
      const unsupportedDisplayInput = handlerInput
      unsupportedDisplayInput.requestEnvelope.context.System.device.supportedInterfaces = {
        'AudioPlayer': {}
      }
      const result = utils.supportsDisplay(unsupportedDisplayInput)
      assert.equal(result, false)
    })
    it('should return false when given invalid params', () => {
      const result = utils.supportsDisplay({})
      assert.equal(result, false)
    })
  })
  describe('#getSupportedInterfaces()', () => {
    it('should return valid supportedInterfaces', () => {
      handlerInput.requestEnvelope.context.System.device.supportedInterfaces = {
        'AudioPlayer': {},
        'Display': {
          'templateVersion': '1.0',
          'markupVersion': '1.0'
        }
      }
      const result = utils.getSupportedInterfaces(handlerInput)
      assert.deepEqual(result, {
        'AudioPlayer': {},
        'Display': {
          'templateVersion': '1.0',
          'markupVersion': '1.0'
        }
      })
    })
    it('should return empty object when given invalid input', () => {
      const result = utils.getSupportedInterfaces({})
      assert.deepEqual(result, {})
    })
  })
  describe('#getDevicePermissions()', () => {
    it('should return all permission for default', () => {
      const permissions = utils.getDevicePermissions()
      assert.deepEqual(permissions, ['read::alexa:device:all:address'])
    })
    it('should return all permission when type is all', () => {
      const permissions = utils.getDevicePermissions('all')
      assert.deepEqual(permissions, ['read::alexa:device:all:address'])
    })
    it('should return all permission when type is country_and_postal_code', () => {
      const permissions = utils.getDevicePermissions('country_and_postal_code')
      assert.deepEqual(permissions, ['read::alexa:device:all:address:country_and_postal_code'])
    })
    it('should return all permission when type is not valid', () => {
      const permissions = utils.getDevicePermissions('hoge')
      assert.deepEqual(permissions, [])
    })
  })
})
