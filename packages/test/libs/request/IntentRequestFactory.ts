import {
    RequestFactory
} from './RequestFactory'
import {
    Intent,
    IntentRequest,
    DialogState
} from 'ask-sdk-core/node_modules/ask-sdk-model'

export class InvalidIntentRequestException extends Error {
    public message = 'Invalid IntentRequest object'
}

export class IntenthRequestFactory extends RequestFactory<IntentRequest> {
    public constructor (locale: string = 'en-US') {
        super('IntentRequest', locale)
    }

    public setIntent (intent: Intent): this {
        this.updateRequest({
            intent
        })
        return this
    }

    public setDialogState (state: DialogState): this {
        this.updateRequest({
            dialogState: state
        })
        return this
    }

    protected validateRequest (): void {
        if (!this.request.intent) throw new InvalidIntentRequestException()
    }
}
