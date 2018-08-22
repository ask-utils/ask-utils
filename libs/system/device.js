const { getDevice } = require('../intentHandlers')
/**
 * get device id
 *
 * @param {object} handlerInput - from ask-sdk
 * @return {string} - deviceId
 * @since 0.7.0
 **/
const getDeviceId = handlerInput => {
  const device = getDevice(handlerInput)
  return device.deviceId || ''
}
module.exports.getDeviceId = getDeviceId

/**
 * Is supported display
 *
 * @param {object} handlerInput - from ask-sdk
 * @return {bool} - If supported display interface, return true
 * @since 0.7.0
 **/
const supportsDisplay = handlerInput => {
  const supportedInterfaces = getSupportedInterfaces(handlerInput)
  if (supportedInterfaces.Display) return true
  return false
}
module.exports.supportsDisplay = supportsDisplay

/**
 * Get supported interface object
 *
 * @param {object} handlerInput - from ask-sdk
 * @return {object} - context.System.device.supportedInterfaces
 * @since 0.7.0
 **/
const getSupportedInterfaces = handlerInput => {
  const device = getDevice(handlerInput)
  if (
    device &&
    device.supportedInterfaces
  ) {
    return device.supportedInterfaces
  }
  return {}
}
module.exports.getSupportedInterfaces = getSupportedInterfaces

/**
 * Get device permissions
 *E982ITVV7EK5U
 * @return {string[]} - lists of permissions
 * @param {string} [type='all'] - permission type
 * @since 0.7.0
 **/
const getDevicePermissions = (type = 'all') => {
  switch (type) {
    case 'all':
      return ['read::alexa:device:all:address']
    case 'country_and_postal_code':
      return ['read::alexa:device:all:address:country_and_postal_code']
    default:
      return []
  }
}
module.exports.getDevicePermissions = getDevicePermissions
