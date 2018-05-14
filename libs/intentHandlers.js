const isHandledIntent = (input, intentName) => input.requestEnvelope.request.intent.name === intentName
const isMatchedRequestType = (input, type) => input.requestEnvelope.request.type === type
const isIntentRequest = (input) => isMatchedRequestType(input, 'IntentRequest')
const canHandle = (handlerInput, type, intentName = '') => {
  if (type === 'IntentRequest') {
    return isIntentRequest(handlerInput) && isHandledIntent(handlerInput, intentName)
  }
  return isMatchedRequestType(handlerInput, type)
}
const getRequest = handlerInput => {
  if (
    handlerInput &&
    handlerInput.requestEnvelope &&
    handlerInput.requestEnvelope.request
  ) {
    return handlerInput.requestEnvelope.request
  }
  return {}
}
const getDialogState = (handlerInput) => {
  const request = getRequest(handlerInput)
  const { dialogState } = request
  return dialogState || ''
}
const getIntent = handlerInput => {
  const request = getRequest(handlerInput)
  if (request && Object.keys(request).length > 0 && request.intent) return request.intent
  return {}
}
module.exports.isHandledIntent = isHandledIntent
module.exports.isMatchedRequestType = isMatchedRequestType
module.exports.isIntentRequest = isIntentRequest
module.exports.canHandle = canHandle
module.exports.getRequest = getRequest
module.exports.getDialogState = getDialogState
module.exports.getIntent = getIntent
