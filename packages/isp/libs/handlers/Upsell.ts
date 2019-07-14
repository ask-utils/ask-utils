import { HandlerInput } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import { BuyResponseHandler } from './BuyResponse'
export const UpsellHandler = {
    canHandle (handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'Connections.Response' &&
          handlerInput.requestEnvelope.request.name === 'Upsell'
    },
    async handle (handlerInput: HandlerInput): Promise<Response> {
        return BuyResponseHandler.handle(handlerInput)
    }
}

export default UpsellHandler
