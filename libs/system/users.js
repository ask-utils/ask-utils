const { getSystem } = require('../intentHandlers')

const getUser = handlerInput => {
  const system = getSystem(handlerInput)
  if (system && system.user) return system.user
  return {}
}
const getConsentToken = handlerInput => {
  const user = getUser(handlerInput)
  if (user && user.permissions) return user.permissions
  return ''
}

module.exports = {
  getConsentToken,
  getUser
}
