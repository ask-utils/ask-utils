import {
    createIntentRequestHandlerInput,
    LaunchRequestFactory
} from '@ask-utils/test'
import {
    shouldMatchRequestType,
    shouldMatchIntentRequest
} from '../../../libs/matcher/helpers'
import { Request } from 'ask-sdk-model'

const createRequest = () => {
    const input = createIntentRequestHandlerInput({
        name: 'HelloIntent',
        confirmationStatus: 'NONE'
    })
    return input.requestEnvelope.request
}
describe('libs/matcher/helpers.ts', () => {
    let request: Request
    beforeEach(() => {
        request = createRequest()
    })
    describe('shouldMatchRequestType', () => {
        it('should return true when match the intent name [HelloIntent]', () => {
            expect(shouldMatchRequestType(request, {
                requestType: 'IntentRequest',
                intentName: 'HelloIntent',
                handler: ({ responseBuilder }) => responseBuilder.getResponse()
            })).toEqual(true)
        })
        it('should return true when match the intent name [ByeIntent]', () => {
            expect(shouldMatchRequestType(request, {
                requestType: 'IntentRequest',
                intentName: 'ByeIntent',
                handler: ({ responseBuilder }) => responseBuilder.getResponse()
            })).toEqual(true)
        })
        it('should return false when un-matched the request type', () => {
            expect(shouldMatchRequestType(request, {
                requestType: 'SessionEndedRequest',
                handler: ({ responseBuilder }) => responseBuilder.getResponse()
            })).toEqual(false)
        })
    })
    describe('shouldMatchIntentRequest', () => {
        it('should return false when given a not IntentRequest', () => {
            const request = new LaunchRequestFactory().getRequest()
            expect(shouldMatchIntentRequest(request, {
                requestType: 'IntentRequest',
                handler: ({ responseBuilder }) => responseBuilder.getResponse()
            })).toEqual(false)
        })
        it('should return true when match the intent name [HelloIntent]', () => {
            expect(shouldMatchIntentRequest(request, {
                requestType: 'IntentRequest',
                intentName: 'HelloIntent',
                handler: ({ responseBuilder }) => responseBuilder.getResponse()
            })).toEqual(true)
        })
        it('should return false when un-match the intent name [ByeIntent]', () => {
            expect(shouldMatchIntentRequest(request, {
                requestType: 'IntentRequest',
                intentName: 'ByeIntent',
                handler: ({ responseBuilder }) => responseBuilder.getResponse()
            })).toEqual(false)
        })
        it('should return true when given intent name array has matched value [HelloIntent, ByeIntent]', () => {
            expect(shouldMatchIntentRequest(request, {
                requestType: 'IntentRequest',
                intentName: ['HelloIntent', 'ByeIntent'],
                handler: ({ responseBuilder }) => responseBuilder.getResponse()
            })).toEqual(true)
        })
        it('should return true when given intent name array has no matched value [AMAZON.HelpIntent, ByeIntent]', () => {
            expect(shouldMatchIntentRequest(request, {
                requestType: 'IntentRequest',
                intentName: ['AMAZON.HelpIntent', 'ByeIntent'],
                handler: ({ responseBuilder }) => responseBuilder.getResponse()
            })).toEqual(false)
        })
        it('should return true when intent name does not given [For intent fallback]', () => {
            expect(shouldMatchIntentRequest(request, {
                requestType: 'IntentRequest',
                handler: ({ responseBuilder }) => responseBuilder.getResponse()
            })).toEqual(true)
        })
        it('should return false when un-matched the request type', () => {
            expect(shouldMatchIntentRequest(request, {
                requestType: 'SessionEndedRequest',
                handler: ({ responseBuilder }) => responseBuilder.getResponse()
            })).toEqual(false)
        })
    })
})
