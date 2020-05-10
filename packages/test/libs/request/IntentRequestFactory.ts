import {
    RequestFactory
} from './RequestFactory'
import {
    Intent,
    IntentRequest,
    DialogState,
    Slot,
    IntentConfirmationStatus
} from 'ask-sdk-model' // 'ask-sdk-core/node_modules/ask-sdk-model'

export class InvalidIntentRequestException extends Error {
    public message = 'Invalid IntentRequest object'
}

export class IntentRequestFactory extends RequestFactory<IntentRequest> {
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

export type BuildInIntentName =
| 'AMAZON.CancelIntent'
| 'AMAZON.FallbackIntent'
| 'AMAZON.HelpIntent'
| 'AMAZON.LoopOffIntent'
| 'AMAZON.LoopOnIntent'
| 'AMAZON.NextIntent'
| 'AMAZON.NoIntent'
| 'AMAZON.PauseIntent'
| 'AMAZON.PreviousIntent'
| 'AMAZON.RepeatIntent'
| 'AMAZON.ResumeIntent'
| 'AMAZON.SelectIntent'
| 'AMAZON.ShuffleOffIntent'
| 'AMAZON.ShuffleOnIntent'
| 'AMAZON.StartOverIntent'
| 'AMAZON.StopIntent'
| 'AMAZON.YesIntent'
export interface BuildedInIntent {
    name: BuildInIntentName;
    slots?: {
        [key: string]: Slot;
    };
    confirmationStatus: IntentConfirmationStatus;
}

export class AmazonIntentRequestFactory extends IntentRequestFactory {
    public setBuildInIntent (intent: BuildedInIntent): this {
        this.updateRequest({
            intent
        })
        return this
    }
}
