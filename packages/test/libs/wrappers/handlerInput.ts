import {
    HandlerInput
} from 'ask-sdk-core'
import {
    Intent
} from 'ask-sdk-model' // 'ask-sdk-core/node_modules/ask-sdk-model'
import {
    RequestEnvelopeFactory
} from '../RequestEnvelopeFactory'
import {
    HandlerInputFactory
} from '../HandlerInput'
import {
    IntentRequestFactory
} from '../request'

/**
 * Simple helper to create a HandlerInput of intentRequest
 * @param intent
 */
export const createIntentRequestHandlerInput = (intent: Intent): HandlerInput => {
    const handlerInput = (new HandlerInputFactory(
        new RequestEnvelopeFactory(
            (new IntentRequestFactory())
                .setIntent(intent)
        )
    )).create()
    return handlerInput
}
