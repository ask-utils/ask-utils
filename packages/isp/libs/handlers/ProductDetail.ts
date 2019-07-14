import { HandlerInput, getLocale } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import {
    isMatchedIntent,
    updateSessionAttributes
} from '@ask-utils/core'
import {
    getProductNameFromSlot,
    getUserInputProductNo,
    updateISPState
} from './helpers'
import {
    ISPProductClient
} from '../client'
import {
    ProductDetailResponseContentBuilder
} from '../contentBuilders/index'

export const ProductDetailIntentHandler = {
    canHandle (handlerInput: HandlerInput): boolean {
        return isMatchedIntent(handlerInput, 'ProductDetailIntent')
    },
    async handle (handlerInput: HandlerInput): Promise<Response> {
        const { requestEnvelope, serviceClientFactory } = handlerInput
        const locale = getLocale(requestEnvelope)
        const responseBuilder = new ProductDetailResponseContentBuilder(locale, handlerInput.responseBuilder)
        // ISP対応してない（service clientが無い）
        if (!serviceClientFactory) {
            return responseBuilder.setUnSupportedISPResponse().getResponse()
        }
        const productName = getProductNameFromSlot(handlerInput)
        const productNo = getUserInputProductNo(handlerInput)
        if (productName) responseBuilder.setProductName(productName)
        // Slotに値がない
        if (!productName && !productNo) {
            return responseBuilder.setProductNotFoundResponse().getResponse()
        }
        const client = new ISPProductClient(handlerInput)
        await client.fetchLists()
        const product = await client.searchProduct({
            productName: productName || undefined,
            userInputNo: productNo || undefined
        })
        // みつからない or 買えない商品
        if (!product) {
            return responseBuilder.setProductNotFoundResponse().getResponse()
        }
        if (product.purchasable === 'NOT_PURCHASABLE') {
            return responseBuilder.setCanNotBuyTheProductResponse().getResponse()
        }
        // 購入済み
        if (product.entitled === 'ENTITLED') {
            return responseBuilder.setEntitledProductResponse().getResponse()
        }
        responseBuilder.setProduct(product)
        updateISPState(handlerInput.attributesManager, 'BUY')
        updateSessionAttributes(handlerInput, {
            product
        })
        return responseBuilder
            .setProductDetail()
            .getResponse()
    }
}
export default ProductDetailIntentHandler
