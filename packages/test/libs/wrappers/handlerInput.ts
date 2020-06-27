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
    IntentRequestFactory, RequestFactory, LaunchRequestFactory, BuildedInIntent
} from '../request'
import { SessionEndedRequestFactory } from '../request/SessionEndRequest'
import { SessionResumedRequestFactory } from '../request/SessionResumedRequest'
import { MockPersistenceAdapter } from '../adaptors'

export class HandlerInputCreator {
    private locale: string
    private _enablePersistenceAdapter: boolean = false

    public constructor (locale: string = 'en-US') {
        this.locale = locale
    }

    public withPersistenceAdapterMock (enable: boolean = true) {
        this._enablePersistenceAdapter = enable
        return this
    }

    private _setPersistenceAdapter (factory: HandlerInputFactory): HandlerInputFactory {
        if (this._enablePersistenceAdapter === true) {
            factory.setPersistanceAdapter(new MockPersistenceAdapter())
        }
        return factory
    }

    private create<T extends RequestFactory = RequestFactory> (request: T): HandlerInput {
        const factory = new HandlerInputFactory(
            new RequestEnvelopeFactory<T>(request)
        )
        return this._setPersistenceAdapter(factory).create()
    }

    public changeLocale (locale: string): this {
        this.locale = locale
        return this
    }

    public createLaunchRequest (): HandlerInput {
        return this.create(new LaunchRequestFactory(this.locale))
    }

    public createIntentRequest (intent: Intent): HandlerInput {
        return this.create(new IntentRequestFactory().setIntent(intent))
    }

    public createSessionEndedRequest (): HandlerInput {
        return this.create(new SessionEndedRequestFactory())
    }

    public createBuildedInIntent (intent: BuildedInIntent): HandlerInput {
        return this.create(new IntentRequestFactory().setIntent(intent))
    }

    public createSessionResumedRequest (): HandlerInput {
        return this.create(new SessionResumedRequestFactory())
    }
}

/**
 * Simple helper to create a HandlerInput of intentRequest
 * @deprecated
 * @param intent
 */
export const createIntentRequestHandlerInput = (intent: Intent): HandlerInput => {
    const creator = new HandlerInputCreator()
    return creator.createIntentRequest(intent)
}
