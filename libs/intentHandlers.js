const isHandledIntent = (input, intentName) => input.requestEnvelope.request.intent.name === intentName
const isMatchedRequestType = (input, type) => input.requestEnvelope.request.type === type
const isIntentRequest = (input) => isMatchedRequestType(input, 'IntentRequest')
/**
 * Check handle target by handlerInput & instent name
 *
 * @param {object} handlerInput - from ask-sdk
 * @param {string} type - request type
 * @param {string} [intentName=''] - intent name
 * @return {bool} - check result, if matched handler type, will be return true.
 * @since 0.1.0
 * @example
 * // if intent request name is TestDialogIntent, should run the handler
 * const TestDialogIntentHandler = {
 *   canHandle (handlerInput) {
 *     return canHandle(handlerInput, 'IntentRequest', 'TestDialogIntent')
 *   },
 **/
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

/**
 * get dialog state from handlerInput param
 *
 * @param {object} handlerInput - from ask-sdk
 * @return {string} - handlerInput.requestEnvelope.request.dialogState
 * @since 0.3.0
 * @example
 * // if dialog state isn't COMPLETED, should not run the handler.
 * const TestDialogIntentHandler = {
 *   canHandle (handlerInput) {
 *     if (!canHandle(handlerInput, 'IntentRequest', 'TestDialogIntent')) return false
 *     const dialogState = getDialogState(handlerInput)
 *     if (dialogState !== 'COMPLETED') return true
 *     return false
 *   },
 **/
const getDialogState = (handlerInput) => {
  const request = getRequest(handlerInput)
  const { dialogState } = request
  return dialogState || ''
}

/**
 * Get intent from handlerInput param
 *
 * @param {object} handlerInput - from ask-sdk
 * @return {object} - handlerInput.requestEnvelope.request.intent
 * @since 0.3.0
 **/
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
