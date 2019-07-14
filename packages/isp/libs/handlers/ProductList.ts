import { HandlerInput, getLocale } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import {
    isMatchedIntent,
    updateSessionAttributes
} from '@ask-utils/core'
import {
    getAllPurchasableProducts
} from '../productFinders'
import {
    updateISPState
} from './helpers'
import {
    ISPProductClient
} from '../client'
import {
    ProductListResponseContentBuilder
} from '../contentBuilders/index'
export const ProductListIntentHandler = {
    canHandle (handlerInput: HandlerInput): boolean {
        return isMatchedIntent(handlerInput, 'ProductListIntent')
    },
    async handle (handlerInput: HandlerInput): Promise<Response> {
        const { requestEnvelope, serviceClientFactory } = handlerInput
        const locale = getLocale(requestEnvelope)
        const responseBuilder = new ProductListResponseContentBuilder(locale, handlerInput.responseBuilder)
        // ISP対応してない（service clientが無い）
        if (!serviceClientFactory) {
            return responseBuilder.setUnSupportedISPResponse().getResponse()
        }
        const client = new ISPProductClient(handlerInput)
        const { inSkillProducts } = await client.listProducts()
        const products = getAllPurchasableProducts(inSkillProducts)

        // みつからない or 買えない商品
        if (!products || products.length < 1) {
            return responseBuilder.setProductsNotFoundResponse().getResponse()
        }
        updateISPState(handlerInput.attributesManager, 'BUY')
        updateSessionAttributes(handlerInput, {
            products
        })
        return responseBuilder
            .setProductLists(products)
            .setListProducts()
            .getResponse()
    }
}
export default ProductListIntentHandler
