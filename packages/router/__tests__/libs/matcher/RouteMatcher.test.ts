import {
    createIntentRequestHandlerInput
} from '@ask-utils/test'
import {
    RouteMatcher,
    Router
} from '../../../libs/'

describe('RouteMatcher', () => {
    describe('IntentRequestMatcher', () => {
        describe('single intent name', () => {
            it('should return true when given match intent request', async () => {
                const handlerInput = createIntentRequestHandlerInput({
                    name: 'HelloIntent',
                    confirmationStatus: 'NONE'
                })
                const routes: Router = {
                    requestType: 'IntentRequest',
                    intentName: 'HelloIntent',
                    handler: (input) => input.responseBuilder.getResponse()
                }
                const mathcer = new RouteMatcher(handlerInput, routes)
                await mathcer.match()
                expect(mathcer.getMatchResult()).toEqual(true)
            })
            it('should return false when given un-match intent request', async () => {
                const handlerInput = createIntentRequestHandlerInput({
                    name: 'ByeIntent',
                    confirmationStatus: 'NONE'
                })
                const routes: Router = {
                    requestType: 'IntentRequest',
                    intentName: 'HelloIntent',
                    handler: (input) => input.responseBuilder.getResponse()
                }
                const mathcer = new RouteMatcher(handlerInput, routes)
                await mathcer.match()
                expect(mathcer.getMatchResult()).toEqual(false)
            })
        })
        describe('multi intent name', () => {
            it('should return true when given match intent request', async () => {
                const handlerInput = createIntentRequestHandlerInput({
                    name: 'HelloIntent',
                    confirmationStatus: 'NONE'
                })
                const routes: Router = {
                    requestType: 'IntentRequest',
                    intentName: ['AMAZON.StopIntent', 'HelloIntent'],
                    handler: (input) => input.responseBuilder.getResponse()
                }
                const mathcer = new RouteMatcher(handlerInput, routes)
                await mathcer.match()
                expect(mathcer.getMatchResult()).toEqual(true)
            })
            it('should return false when given unmatch intent request', async () => {
                const handlerInput = createIntentRequestHandlerInput({
                    name: 'HelloIntent',
                    confirmationStatus: 'NONE'
                })
                const routes: Router = {
                    requestType: 'IntentRequest',
                    intentName: ['AMAZON.StopIntent', 'AMAZON.CancelIntent'],
                    handler: (input) => input.responseBuilder.getResponse()
                }
                const mathcer = new RouteMatcher(handlerInput, routes)
                await mathcer.match()
                expect(mathcer.getMatchResult()).toEqual(false)
            })
        })
    })
})
