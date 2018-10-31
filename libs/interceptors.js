/**
 * Logger for `addRequestInterceptors`
 *
 * @since 0.12.0
 * @example
 * // To log request parameters in all request
 * const { RequestLogger } = require('ask-utils')
 * exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler
  )
  .addRequestInterceptors(new RequestLogger())
  .lambda()
 *
 * // You can add additional logger
 * const { RequestLogger } = require('ask-utils')
 * const additionalLogger = handlerInput => console.log(handlerInput)
 * exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler
  )
  .addRequestInterceptors(new RequestLogger(additionalLogger))
  .lambda()
 */
class RequestLogger {
  constructor (hook = () => {}) {
    this.hook = hook
  }
  async process (handlerInput) {
    console.log('RequestEnvelope: %j', handlerInput.requestEnvelope)
    await this.hook(handlerInput)
  }
}

/**
 * Logger for `addResponseInterceptors`
 *
 * @since 0.12.0
 * @example
 * // To log response parameters in all request
 * const { ResponseLogger } = require('ask-utils')
 * exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addResponseInterceptors(new ResponseLogger())
  .addErrorHandlers(ErrorHandler)
  .lambda()
 *
 * // You can add additional logger
 * const { ResponseLogger } = require('ask-utils')
 * const additionalLogger = handlerInput => console.log(handlerInput)
 * exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler
  )
  .addResponseInterceptors(new ResponseLogger(additionalLogger))
  .lambda()
 */
class ResponseLogger {
  constructor (hook = () => {}) {
    this.hook = hook
  }
  async process (handlerInput, response) {
    console.log(`Response: ${JSON.stringify(response)}`)
    await this.hook(handlerInput)
  }
}
module.exports = {
  RequestLogger,
  ResponseLogger
}
