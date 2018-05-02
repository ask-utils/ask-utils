const isHandledIntent = (input, intentName) => input.requestEnvelope.request.intent.name === intentName
const isMatchedRequestType = (input, type) => input.requestEnvelope.request.type === type
const isIntentRequest = (input) => isMatchedRequestType(input, 'IntentRequest')
const canHandle = (handlerInput, type, intentName) => {
  if (type === 'IntentRequest') {
    return isIntentRequest(handlerInput) && isHandledIntent(handlerInput, intentName)
  }
  return isMatchedRequestType(handlerInput, type)
}
module.exports.isHandledIntent = isHandledIntent
module.exports.isMatchedRequestType = isMatchedRequestType
module.exports.isIntentRequest = isIntentRequest
module.exports.canHandle = canHandle
