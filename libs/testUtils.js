const { ResponseFactory, AttributesManagerFactory, PersistenceAdapter } = require('ask-sdk-core')

/**
 * get handlerInput object to test your handler function
 *
 * @param {object} requestEnvelope - request object from Alexa Skills Kit
 * @param {object} [context={}] - Lambda's context
 * @return {object} - handlerInput Object to prepare test function
 * @since 0.7.0
 **/
const getHandlerInput = (requestEnvelope, context = {}) => {
  const handlerInput = {
    requestEnvelope,
    context,
    attributesManager: AttributesManagerFactory.init({
      requestEnvelope,
      persistenceAdapter: PersistenceAdapter
    }),
    responseBuilder: ResponseFactory.init(),
    serviceClientFactory: {
      getDirectiveServiceClient: () => {
        return {
          enqueue: (directive, endpoint, token) => ({directive, endpoint, token})
        }
      }
    }
  }
  return handlerInput
}
module.exports.getHandlerInput = getHandlerInput

/**
 * get requestEnvelope object to test your function
 *
 * @return {object} - mock requestEnvelope object
 * @since 0.8.0
 **/
const getRequestEnvelopeMock = () => {
  return {
    session: {
      new: true,
      sessionId: 'amzn1.echo-api.session.[unique-value-here]',
      attributes: {},
      user: {
        userId: 'amzn1.ask.account.[unique-value-here]'
      },
      application: {
        applicationId: 'amzn1.ask.skill.[unique-value-here]'
      }
    },
    version: '1.0',
    request: {
      locale: 'en-US',
      timestamp: '2016-10-27T18:21:44Z',
      type: 'LaunchRequest',
      requestId: 'amzn1.echo-api.request.[unique-value-here]'
    },
    context: {
      AudioPlayer: {
        playerActivity: 'IDLE'
      },
      System: {
        apiEndpoint: 'https://api.amazonalexa.com',
        apiAccessToken: 'exampleAccessToken',
        device: {
          supportedInterfaces: {
            AudioPlayer: {}
          }
        },
        application: {
          applicationId: 'amzn1.ask.skill.[unique-value-here]'
        },
        user: {
          userId: 'amzn1.ask.account.[unique-value-here]'
        }
      }
    }
  }
}
module.exports.getRequestEnvelopeMock = getRequestEnvelopeMock
