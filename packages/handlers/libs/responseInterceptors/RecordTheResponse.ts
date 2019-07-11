import { ResponseInterceptor } from 'ask-sdk-core'
import {
    updateSessionAttributes
} from 'ask-utils'
export const RecordTheResponseInterceptor: ResponseInterceptor = {
    process (handlerInput, response): void | Promise<void> {
        // No response text
        if (!response) return
        // Session should be closed
        if (response.shouldEndSession === true) return
        // Skill will be closed
        if (!response.reprompt) return
        updateSessionAttributes(handlerInput, {
            lastResponse: response
        })
    }
}
export default RecordTheResponseInterceptor
