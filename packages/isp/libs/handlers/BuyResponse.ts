import { HandlerInput, getLocale } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'

import {
    isBuyConnectionResposneRequest,
    getProductIdFromConnectionResponse,
    isUpsellConnectionResposneRequest
} from '../requestHandlers'
import {
    BuyResponseContentBuilder
} from '../contentBuilders/index'
import {
    ISPProductClient
} from '../client'

export const BuyResponseHandler = {
    canHandle (handlerInput: HandlerInput): boolean {
        if (handlerInput.requestEnvelope.request.type !== 'Connections.Response') return false
        return handlerInput.requestEnvelope.request.name === 'Buy' || handlerInput.requestEnvelope.request.name === 'Upsell'
    },
    async handle (handlerInput: HandlerInput): Promise<Response> {
        const { requestEnvelope, responseBuilder, serviceClientFactory } = handlerInput
        const locale = getLocale(requestEnvelope)

        const client = new ISPProductClient(handlerInput)
        const products = await client.getProducts()
        const productNames = products.map(p => p.name).join(/^ja/.test(locale) ? 'と' : 'and')
        const contents = new BuyResponseContentBuilder(locale, responseBuilder, productNames)

        if (!serviceClientFactory) return contents.setUnSupportedISPResponse().getResponse()
        const { request } = requestEnvelope
        if (!isBuyConnectionResposneRequest(request) && !isUpsellConnectionResposneRequest(request)) {
            throw new Error('Invalid request object')
        }
        const productId = getProductIdFromConnectionResponse(requestEnvelope.request)

        if (!productId) {
            return contents.setProductNotFoundResponse().getResponse()
        }
        const product = await client.getProductById(productId)
        contents.setProduct(product)
        if (Number(request.status.code) === 200) {
            const { purchaseResult } = request.payload
            if (purchaseResult === 'DECLINED') {
                return contents.setDeclinedPurchaseResult().getResponse()
            }
            if (purchaseResult === 'ACCEPTED') {
                return contents.setAcceptedPurchaseResult().getResponse()
            }
        }
        console.log('Connections.Response indicated failure. error:' + request.status.message)
        return contents.setFailedPurchaseResult().getResponse()
    }
}
export default BuyResponseHandler
