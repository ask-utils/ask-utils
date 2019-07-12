import { HandlerInput } from 'ask-sdk-core'
import { RequestInterceptor, ResponseInterceptor } from 'ask-sdk-runtime'
import interfaces from 'ask-sdk-model'

export const RequestLogger: RequestInterceptor<HandlerInput> = {
    async process (handlerInput: HandlerInput): Promise<void> {
        console.log('[RequestLogger] RequestEnvelope: %j', handlerInput.requestEnvelope)
    }
}
export const ResponseLogger: ResponseInterceptor<HandlerInput, interfaces.Response> = {
    async process (handlerInput: HandlerInput, response: interfaces.Response): Promise<void> {
        console.log('[ResponseLogger] RequestEnvelope: %j', handlerInput.requestEnvelope)
        console.log('[ResponseLogger] Response: %j', response)
    }
}
export default {
    RequestLogger,
    ResponseLogger
}
