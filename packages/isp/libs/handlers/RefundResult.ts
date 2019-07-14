
import { HandlerInput, getLocale } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import {
    isCancelConnectionResposneRequest
} from './../requestHandlers'
import {
    RefundResponseContentBuilder
} from '../contentBuilders/index'

export const RefundResponseHandler = {
    canHandle (handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'Connections.Response' &&
      handlerInput.requestEnvelope.request.name === 'Cancel'
    },
    async handle (handlerInput: HandlerInput): Promise<Response> {
        const { requestEnvelope, serviceClientFactory } = handlerInput
        const locale = getLocale(requestEnvelope)
        const responseBuilder = new RefundResponseContentBuilder(locale, handlerInput.responseBuilder)
        if (!serviceClientFactory) {
            return responseBuilder.setUnSupportedISPResponse().getResponse()
        }
        const { request } = requestEnvelope
        if (!isCancelConnectionResposneRequest(request)) throw new Error('Invalid request object')
        if (Number(request.status.code) === 200) {
            if (request.payload.purchaseResult === 'ACCEPTED') {
                return responseBuilder.setAcceptedRefundResult().getResponse()
            }
            if (request.payload.purchaseResult === 'DECLINED') {
                return responseBuilder.setDeclinedRefundResult().getResponse()
            }
        }
        return responseBuilder.setFailedRefundResult().getResponse()
    }
}
export default RefundResponseHandler
