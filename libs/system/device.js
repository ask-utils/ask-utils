const { getDevice } = require('../intentHandlers')
/**
 * get device id
 *
 * @param {object} handlerInput - from ask-sdk
 * @return {string} - deviceId
 * @since 0.7.0
 * @example
 * const deviceId = getDeviceId(handlerInput)
 * // 'amzn1.ask.device.xxxxx'
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
 * @since 0.4.0
 * @example
 * When invoke the function from Echo Dots, it will gets false
 * const isSupportsDisplay = supportsDisplay(handlerInput)
 * // false
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
 * @since 0.4.0
 * @example
 * getSupportedInterfaces(handlerInput)
 * // {
 * //   'AudioPlayer': {},
 * //   'Display': {
 * //     'templateVersion': '1.0',
 * //     'markupVersion': '1.0'
 * //   }
 * // }
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
 *
 * @return {string[]} - lists of permissions
 * @param {string} [type='all'] - permission type
 * @since 0.7.0
 * @example
 * // You can get 'read::alexa:device:all:address'
 * getDevicePermissions('all')
 * // ['read::alexa:device:all:address']
 * @example
 * // you can get 'read::alexa:device:all:address:country_and_postal_code'
 * getDevicePermissions('country_and_postal_code')
 * // ['read::alexa:device:all:address:country_and_postal_code']
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
