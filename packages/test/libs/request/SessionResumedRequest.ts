import {
    RequestFactory
} from './RequestFactory'
import { SessionResumedRequest, Cause } from 'ask-sdk-model' // 'ask-sdk-core/node_modules/ask-sdk-model'

export class SessionResumedRequestFactory extends RequestFactory<SessionResumedRequest> {
    public constructor (locale: string = 'en-US') {
        super('SessionResumedRequest', locale)
    }

    public setCause (cause: Cause): this {
        this.updateRequest({
            cause
        })
        return this
    }
}
