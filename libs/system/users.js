const { getUser } = require('../intentHandlers')
const getConsentToken = handlerInput => {
  const user = getUser(handlerInput)
  if (user && user.permissions) return user.permissions
  return ''
}

module.exports.getConsentToken = getConsentToken
