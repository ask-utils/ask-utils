import { isMatchedIntent } from 'ask-utils'
import { HandlerBuilder } from './Base'
import {
    CanHandle, CanHandleResponse
} from './model'

export class IntentHandlerBuilder extends HandlerBuilder {
    public constructor (intentName: string) {
        super()
        this.intentName = intentName
    }
    protected intentName: string
    public canHandle: CanHandle = (handlerInput): CanHandleResponse => {
        if (!isMatchedIntent(handlerInput, this.intentName)) return false
        return this.canHandleFilter(handlerInput)
    }
}
export default IntentHandlerBuilder
