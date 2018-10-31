const { getSystem } = require('../intentHandlers')

/**
 * Get user object from handlerInput
 * @param {object} handlerInput - from ask-sdk
 * @return {object} handlerInput.requestEnvelope.context.System.user
 * @example
 * const user = getUser(handlerInput)
 * // {
 * //   'userId': 'amzn1.ask.account.xxxxx'
 * // }
 */
const getUser = handlerInput => {
  const system = getSystem(handlerInput)
  if (system && system.user) return system.user
  return {}
}

/**
 * Get user consent token from handlerInput
 * @param {object} handlerInput - from ask-sdk
 * @return {string} consent token (handlerInput.requestEnvelope.context.System.user.permissions)
 * @example
 * const token = getConsentToken(handlerInput)
 * // 'XXXXXX'
 */
const getConsentToken = handlerInput => {
  const user = getUser(handlerInput)
  if (user && user.permissions) return user.permissions
  return ''
}

module.exports = {
  getConsentToken,
  getUser
}
