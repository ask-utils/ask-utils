import { RequestHandler } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import {
    getSessionAttribute,
    isMatchedIntent
} from 'ask-utils'

export const RepeatIntent: RequestHandler = {
    canHandle (handlerInput): Promise<boolean> | boolean {
        return isMatchedIntent(handlerInput, 'AMAZON.RepeatIntent')
    },
    handle (handlerInput): Promise<Response> | Response {
        const lastResponse = getSessionAttribute(handlerInput, 'lastResponse') as Response | null
        if (!lastResponse) throw new Error('No repeat content')
        return lastResponse
    }
}
export default RepeatIntent
