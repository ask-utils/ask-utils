import {
    RequestFactory
} from './RequestFactory'
import { SessionEndedRequest, SessionEndedReason, SessionEndedError } from 'ask-sdk-model' // 'ask-sdk-core/node_modules/ask-sdk-model'

export class SessionEndedRequestFactory extends RequestFactory<SessionEndedRequest> {
    public constructor (locale: string = 'en-US') {
        super('SessionEndedRequest', locale)
    }

    public setReason (reason: SessionEndedReason): this {
        this.updateRequest({
            reason
        })
        return this
    }

    public setError (error: SessionEndedError): this {
        this.updateRequest({
            error
        })
        return this
    }
}
