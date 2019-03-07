import { HandlerInput } from 'ask-sdk-core'
import { RequestInterceptor, ResponseInterceptor } from 'ask-sdk-runtime'
import interfaces from 'ask-sdk-model'

const Request: RequestInterceptor<HandlerInput> = {
    async process (handlerInput: HandlerInput) {
        console.log('RequestEnvelope: %j', handlerInput.requestEnvelope)
    }
}
const Response: ResponseInterceptor<HandlerInput, interfaces.Response> = {
    async process (handlerInput: HandlerInput, response: interfaces.Response) {
        console.log('Response: %j', response)
    }
}
export default {
    Request,
    Response
}
