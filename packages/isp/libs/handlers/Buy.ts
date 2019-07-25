import { HandlerInput, getLocale } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import {
    isYesIntent,
    isMatchedIntent
} from '@ask-utils/core'
import {
    HandlerBuilder,
    CanHandle
} from './fixtures'
import {
    isMatchedISPState,
    getProduct
} from './helpers'
import {
    NoProductResponse,
    UnSupportedISPResponse
} from '../contentBuilders/generalResponse'
import {
    getBuyProductDirective
} from '../directiveBuilders'
import {
    ISPProductClient
} from '../client'
import {

} from '../productFinders'

export class BuyIntentHandlerBuilder extends HandlerBuilder {
    public canHandle: CanHandle = (handlerInput) => {
        return this.canHandleFilter(handlerInput)
    }
    public static create () {

    }
}

export const BuyIntentHandler = {
    canHandle (handlerInput: HandlerInput): boolean {
        if (isMatchedIntent(handlerInput, 'BuyIntent')) return true
        if (isYesIntent(handlerInput)) {
            return isMatchedISPState(handlerInput.attributesManager, 'BUY')
        }
        return false
    },
    async handle (handlerInput: HandlerInput): Promise<Response> {
        const { requestEnvelope, responseBuilder, serviceClientFactory } = handlerInput
        const locale = getLocale(requestEnvelope)
        if (!serviceClientFactory) {
            const noISPResponse = UnSupportedISPResponse(locale)
            return responseBuilder.speak(noISPResponse.speechText)
                .reprompt(noISPResponse.repromptText)
                .getResponse()
        }

        const product = await getProduct(handlerInput)
        // みつからない
        if (!product) {
            const client = new ISPProductClient(handlerInput)
            const { inSkillProducts } = await client.listProducts()
            return NoProductResponse(responseBuilder, locale, inSkillProducts)
        }
        // 買えない商品
        if (product.purchasable === 'NOT_PURCHASABLE') {
            if (/^ja/.test(locale)) {
                return responseBuilder
                    .speak('すみません。その商品は現在購入できません。他に何をしますか？')
                    .reprompt('他に何をしますか？')
                    .getResponse()
            }
            return responseBuilder
                .speak("I don't think we have a product by that name.  Can you try again?")
                .reprompt("I didn't catch that. Can you try again?")
                .getResponse()
        }

        // ここで一旦データを保存する
        // Connectionの方にいくとセッションが切れるから
        const attributes = handlerInput.attributesManager.getSessionAttributes()
        const atts = await handlerInput.attributesManager.getPersistentAttributes()
        const nextAttributes = Object.assign(atts, {
            ispLastSessionAttribtes: attributes
        })
        await handlerInput.attributesManager.setPersistentAttributes(nextAttributes)
        await handlerInput.attributesManager.savePersistentAttributes()

        return handlerInput.responseBuilder
            .addDirective(getBuyProductDirective(product.productId))
            .getResponse()
    }
}

export default BuyIntentHandler
