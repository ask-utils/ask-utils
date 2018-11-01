const { getSystem } = require('../intentHandlers')

/**
 * Get API endpint
 * @param {object} handlerInput - from ask-sdk
 * @return {object} handlerInput.requestEnvelope.context.System.apiEndpoint
 * @since 0.14.0
 * @example
 * const apiEndpoint = getApiEndPoint(handlerInput)
 * // 'https://api.xxxx'
 */
const getApiEndPoint = (handlerInput) => {
  const system = getSystem(handlerInput)
  if (system && system.apiEndpoint) return system.apiEndpoint
  return ''
}
/**
 * Get API access token
 * @param {object} handlerInput - from ask-sdk
 * @return {object} handlerInput.requestEnvelope.context.System.apiAccessToken
 * @since 0.14.0
 * @example
 * const apiToken = getApiAccessToken(handlerInput)
 * // 'XXXXXXXXXXXx'
 */
const getApiAccessToken = (handlerInput) => {
  const system = getSystem(handlerInput)
  if (system && system.apiAccessToken) return system.apiAccessToken
  return ''
}

module.exports = {
  getApiEndPoint,
  getApiAccessToken
}
