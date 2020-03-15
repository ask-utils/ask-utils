import {
    RequestEnvelope
} from 'ask-sdk-core/node_modules/ask-sdk-model'

import {
    RequestFactory
} from './request'
import {
    SessionFactory
} from './session'
import {
    ContextFactory
} from './context'

export class RequestEnvelopeFactory {
    public requestFactory: RequestFactory;
    public contextFactory: ContextFactory;
    public sessionFactory: SessionFactory;
    public version = '1.0'

    public constructor (requestFactory: RequestFactory, contextFactory: ContextFactory, sessionFactory: SessionFactory) {
        this.requestFactory = requestFactory
        this.contextFactory = contextFactory
        this.sessionFactory = sessionFactory
    }

    public getRequest (): RequestEnvelope {
        return {
            request: this.requestFactory.getRequest(),
            session: this.sessionFactory.getSession(),
            context: this.contextFactory.getContext(),
            version: this.version
        }
    }
}
