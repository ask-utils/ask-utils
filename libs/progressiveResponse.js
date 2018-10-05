/**
 * Create progressive response directive
 *
 * @param {object} handlerInput - from ask-sdk
 * @param {string} speechText - text content to speach prrogressive
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
