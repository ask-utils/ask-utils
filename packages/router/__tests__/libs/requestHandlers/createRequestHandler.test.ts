import {
    createIntentRequestHandlerInput
} from '@ask-utils/test'
import {
    createRequestHandler
} from '../../../libs/requestHandlers'

describe('requestHandler', () => {
    describe('createRequestHandler', () => {
        it('should return false when create LaucnRequest and give another request', async () => {
            const requestHandler = createRequestHandler({
                requestType: 'LaunchRequest',
                handler: (input) => input.responseBuilder.getResponse()
            })
            const handlerInput = createIntentRequestHandlerInput({
                name: 'HelloIntent',
                confirmationStatus: 'NONE'
            })
            expect(await requestHandler.canHandle(handlerInput)).toEqual(false)
        })
        it('should return true when give matcher request', async () => {
            const requestHandler = createRequestHandler({
                requestType: 'IntentRequest',
                intentName: 'HelloIntent',
                handler: (input) => input.responseBuilder.getResponse()
            })
            const handlerInput = createIntentRequestHandlerInput({
                name: 'HelloIntent',
                confirmationStatus: 'NONE'
            })
            expect(await requestHandler.canHandle(handlerInput)).toEqual(true)
        })
        it('should return false when give matcher request but return false custom matcher', async () => {
            const requestHandler = createRequestHandler({
                requestType: 'IntentRequest',
                intentName: 'HelloIntent',
                situation: {
                    custom: () => false
                },
                handler: (input) => input.responseBuilder.getResponse()
            })
            const handlerInput = createIntentRequestHandlerInput({
                name: 'HelloIntent',
                confirmationStatus: 'NONE'
            })
            expect(await requestHandler.canHandle(handlerInput)).toEqual(false)
        })
    })
})
