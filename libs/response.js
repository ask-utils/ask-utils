const { getRequest } = require('./intentHandlers')

/**
 * get error message object
 *
 * @param {object} handlerInput - from ask-sdk
 * @return {object} - error object
 * @since 0.7.0
 **/
const getErrorMessage = handlerInput => {
  const request = getRequest(handlerInput)
  if (request && Object.keys(request).length > 0) {
    return request.error || {}
  }
  return {}
}
module.exports.getErrorMessage = getErrorMessage
