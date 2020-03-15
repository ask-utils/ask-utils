import {
    RequestFactory
    } from './RequestFactory'
    import {
        Intent,
        IntentRequest,
        DialogState
    }from 'ask-sdk-core/node_modules/ask-sdk-model'
    
export class InvalidIntentRequestException extends Error {
    message = "Invalid IntentRequest object"
}

    export class IntenthRequestFactory extends RequestFactory<IntentRequest> {
        public constructor(locale: string = 'en-US') {
            super("IntentRequest", locale)
        }

        public setIntent(intent: Intent) {
            this.updateRequest({
                intent
            })
            return this
        }

        public setDialogState(state: DialogState) {
            this.updateRequest({
                dialogState: state
            })
            return this
        }

        protected validateRequest() {
            if (!this.request.intent) throw new InvalidIntentRequestException()
            return true
        }
    }