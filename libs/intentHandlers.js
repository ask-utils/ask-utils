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
 *  // When the request is IntentRequest and HelloIntent, return true.
 * canHandle(handlerInput, 'IntentRequest', 'HelloIntent')
 * // true
 * @example
 *  // When the request is LaunchRequest, return true.
 * canHandle(handlerInput, 'LaunchRequest')
 * // true
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

/**
 * Check the request handler type is matched LaunchRequest
 *
 * @param {object} handlerInput - from ask-sdk
 * @return {bool} - If the request is LaunchRequest, return true
 * @since 0.1.0
 * @example
 *  // When the request is IntentRequest and HelloIntent, return false.
 * isLaunchRequest(handlerInput)
 * // true
 * @example
 *  // When the request is LaunchRequest, return true.
 * const LaunchRequestHandler = {
 *   canHandle (handlerInput) {
 *     return isLaunchRequest(handlerInput)
 *   },
 */
const isLaunchRequest = handlerInput => {
  return canHandle(handlerInput, 'LaunchRequest')
}

/**
 * Get request object from handlerInput
 * @param {object} handlerInput - from ask-sdk
 * @example
 * const request = getRequest(handlerInput)
 * // {
 * // 'type': 'IntentRequest',
 * // 'requestId': 'amzn1.echo-api.request.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
 * // 'timestamp': '2018-05-02T00:18:57Z',
 * // 'locale': 'ja-JP',
 * // 'intent': {
 * // ...
 */
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
 * Get session status. If true, is is new session
 *
 * @param {object} handlerInput  - from ask-sdk
 * @since 0.12.0
 * @return {boolean}
 * @example
 * // if it is new session, set user data into the session
 * if (isNewSession(handlerInput)) {
 *   const attributes = await handlerInput.attributesManager.getPersistentAttributes()
 *   handlerInput.attributesManager.setSessionAttributes(attributes)
 * }
 */
const isNewSession = (handlerInput) => {
  if (
    handlerInput.requestEnvelope &&
    handlerInput.requestEnvelope.session
  ) {
    return handlerInput.requestEnvelope.session.new || false
  }
  return false
}

/**
 * Get locale that the skill working
 * @param {object} handlerInput  - from ask-sdk
 * @param {string} [defaultLocale='en-US'] - default locale
 * @since 0.10.0
 * @return {string} locale string
 * @example
 * const locale = getLocale(handlerInput)
 * const speech = locale === 'ja-JP' ? 'こんにちは' : 'Hello'
 */
const getLocale = (handlerInput, defaultLocale = 'en-US') => {
  const request = getRequest(handlerInput)
  return request.locale || defaultLocale
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
 * @example
 * // If you want to get request intent object you can get it by the function.
 * const intent = getIntent(handlerInput)
 * // {
 * //   'name': 'HelloWorldIntent',
 * //   'confirmationStatus': 'NONE',
 * //   'slots': {
 * //     'date': {
 * //       'name': 'date',
 * //       'value': '2018-05-07',
 * //       'confirmationStatus': 'NONE'
 * //     }
 * //   }
 * // }
 **/
const getIntent = handlerInput => {
  const request = getRequest(handlerInput)
  if (request && Object.keys(request).length > 0 && request.intent) return request.intent
  return {}
}

/**
 * Get request context
 *
 * @link https://developer.amazon.com/ja/blogs/alexa/post/6839eb1c-f718-41cd-ad0c-6ba59c5360f5/alexa-skill-recipe-making-the-most-of-devices-that-support-display
 * @return {object} handlerInput.requestEnvelope.context
 * @example
 * const context = getContext(handlerInput)
 * // {
 * //  'AudioPlayer': {
 * //    'playerActivity': 'IDLE'
 * //  },
 * //  'Display': {
 * //    'token': ''
 * //  },
 * //  ...
 * // }
 **/
const getContext = handlerInput => {
  if (
    handlerInput &&
    handlerInput.requestEnvelope &&
    handlerInput.requestEnvelope.context
  ) {
    return handlerInput.requestEnvelope.context
  }
  return {}
}
/**
 * Get system object from handlerInput
 * @param {object} handlerInput - from ask-sdk
 * @example
 * const system = getSystem(handlerInput)
 * // {
 * //   'application': {
 * //     'applicationId': 'amzn1.ask.skill.xxxxxxx'
 * //   },
 * //   'user': {
 * //     'userId': 'amzn1.ask.account.xxxxx'
 * //   },
 * //   'device': {
 * //  ...
 * //   }
 * // }
 */
const getSystem = handlerInput => {
  const context = getContext(handlerInput)
  if (context && context.System) return context.System
  return {}
}

/**
 * Get device block from handlerInput
 * @param {object} handlerInput - from ask-sdk
 * @example
 * const device = getDevice(handlerInput)
 * // {
 * //   'deviceId': 'amzn1.ask.device.xxxxx',
 * //   'supportedInterfaces': {
 * //     'AudioPlayer': {},
 * //     'Display': {
 * //       'templateVersion': '1.0',
 * //       'markupVersion': '1.0'
 * //     }
 * //   }
 * // }
 */
const getDevice = handlerInput => {
  const system = getSystem(handlerInput)
  if (system && system.device) return system.device
  return {}
}

module.exports = {
  getLocale,
  isHandledIntent,
  isMatchedRequestType,
  isIntentRequest,
  canHandle,
  getRequest,
  getDialogState,
  getIntent,
  getSystem,
  getDevice,
  isNewSession,
  isLaunchRequest
}
