const { ResponseFactory, AttributesManagerFactory, PersistenceAdapter } = require('ask-sdk-core')
const { services } = require('ask-sdk-model')

const { ServiceClientFactory, apiClient } = services

const getHandlerInput = (requestEnvelope, context = {}) => {
  const handlerInput = {
    requestEnvelope,
    context,
    attributesManager: AttributesManagerFactory.init({
      requestEnvelope,
      persistenceAdapter: PersistenceAdapter
    }),
    responseBuilder: ResponseFactory.init(),
    serviceClientFactory: apiClient
      ? new ServiceClientFactory({
        apiClient: apiClient,
        apiEndpoint: requestEnvelope.context.System.apiEndpoint,
        authorizationValue: requestEnvelope.context.System.apiAccessToken
      })
      : undefined
  }
  return handlerInput
}

module.exports.getHandlerInput = getHandlerInput
