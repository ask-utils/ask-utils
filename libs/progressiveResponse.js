/**
 * Create progressive response directive
 *
 * @param {object} handlerInput - from ask-sdk
 * @param {string} speechText - text content to speach prrogressive
 * @since 0.9.0
 * @example
 * async handle (handlerInput) {
 *  try {
 *   await enqueueProgressiveResponseDirective(handlerInput, 'Please wait for a while')
 *  } catch (err) {
 *   // if it failed we can continue, just the user will wait longer for first response
 *   console.log(err)
 *  }
 *  // call some api
 *  const content = await get()
 *  return responseBuilder
 *      .speak(content)
 *      .getResponse()
 * }
 */
const enqueueProgressiveResponseDirective = (handlerInput, speechText) => {
  // Call Alexa Directive Service.
  const requestEnvelope = handlerInput.requestEnvelope
  const directiveServiceClient = handlerInput.serviceClientFactory.getDirectiveServiceClient()

  const requestId = requestEnvelope.request.requestId
  const endpoint = requestEnvelope.context.System.apiEndpoint
  const token = requestEnvelope.context.System.apiAccessToken

  // build the progressive response directive
  const directive = {
    header: {
      requestId
    },
    directive: {
      type: 'VoicePlayer.Speak',
      speech: speechText
    }
  }

  // send directive
  return directiveServiceClient.enqueue(directive, endpoint, token)
}
module.exports = {
  enqueueProgressiveResponseDirective
}
