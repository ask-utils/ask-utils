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
    public readonly request: RequestFactory;
    public readonly context: ContextFactory;
    public readonly session: SessionFactory;
    public readonly version = '1.0'

    public constructor (
        request: RequestFactory,
        context: ContextFactory = new ContextFactory(),
        session: SessionFactory = new SessionFactory()
    ) {
        this.request = request
        this.context = context
        this.session = session
    }

    public getRequest (): RequestEnvelope {
        return {
            request: this.request.getRequest(),
            session: this.session.getSession(),
            context: this.context.getContext(),
            version: this.version
        }
    }
}
