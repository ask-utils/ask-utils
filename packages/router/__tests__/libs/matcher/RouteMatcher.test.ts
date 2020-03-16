import {
    createIntentRequestHandlerInput
} from '@ask-utils/test'
import {
    RouteMatcher,
    Router
} from '../../../libs/'

describe('RouteMatcher', () => {
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
})
