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
    public readonly requestFactory: RequestFactory;
    public readonly contextFactory: ContextFactory;
    public readonly sessionFactory: SessionFactory;
    public readonly version = '1.0'

    public constructor (
        requestFactory: RequestFactory,
        contextFactory: ContextFactory = new ContextFactory(),
        sessionFactory: SessionFactory = new SessionFactory()
    ) {
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
