import { HandlerInput, getLocale } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import {
    isMatchedIntent
} from '@ask-utils/core'
import {
    getProduct,
    getProductNameFromSlot
} from './helpers'

import {
    RefundContentBuilder
} from '../contentBuilders/index'

export const RefundIntentHandler = {
    canHandle (handlerInput: HandlerInput): boolean {
        return isMatchedIntent(handlerInput, 'RefundIntent')
    },
    async handle (handlerInput: HandlerInput): Promise<Response> {
        const { requestEnvelope, serviceClientFactory } = handlerInput
        const locale = getLocale(requestEnvelope)

        const product = await getProduct(handlerInput)

        const productName = getProductNameFromSlot(handlerInput)
        const responseBuilder = new RefundContentBuilder(locale, handlerInput.responseBuilder, productName || '')
        if (!serviceClientFactory) {
            return responseBuilder.setUnSupportedISPResponse().getResponse()
        }
        // みつからない
        if (!product) return responseBuilder.setProductNotFoundResponse().getResponse()
        responseBuilder.setProduct(product)

        if (product.entitled !== 'ENTITLED') {
            return responseBuilder.setNoEntitledProductResponse().getResponse()
        }
        return responseBuilder.setCancelDirective(product.productId).getResponse()
    }
}

export default RefundIntentHandler
