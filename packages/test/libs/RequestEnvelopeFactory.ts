import {
    RequestEnvelope
} from 'ask-sdk-core/node_modules/ask-sdk-model'
import { v4 as uuid } from 'uuid'
import {
    RequestFactory
} from './request'
import {
    SessionFactory
} from './session'
import {
    ContextFactory
} from './context'
import {
    UserFactory
} from './user'

export class RequestEnvelopeFactory {
    public applicationId: string = 'amzn1.echo-sdk-ams.app.' + uuid()
    public userId: string = 'amzn1.ask.account.' + uuid()
    public sessionId: string = 'SessionID.' + uuid()
    public requestId: string = 'amzn1.echo-external.request.' + uuid()
    public apiAccessToken: string = ''
    public apiEndpoint: string = 'https://api.amazonalexa.com'

    public readonly request: RequestFactory;
    public readonly context: ContextFactory;
    public readonly session: SessionFactory;
    public readonly user: UserFactory;
    public readonly version = '1.0'

    public constructor (
        request: RequestFactory,
        context: ContextFactory = new ContextFactory(),
        session: SessionFactory = new SessionFactory(),
        user: UserFactory = new UserFactory()
    ) {
        this.request = request
        this.context = context
        this.session = session
        this.user = user
    }
    private putRequestAttributes (): this {
        const {
            requestId,
            applicationId,
            userId,
            sessionId,
            apiAccessToken,
            apiEndpoint
        } = this
        this.user.putUserId(userId)
        this.request.setRequestId(requestId)
        this.context.system.putApplicationId(applicationId)
            .putApiEndpoint(apiEndpoint)
            .putApiAccessToken(apiAccessToken)
            .putUser(this.user.getUser())
        this.session.putSessionId(sessionId)
            .putUser(this.user.getUser())

        return this
    }

    public getRequest (): RequestEnvelope {
        this.putRequestAttributes()
        return {
            request: this.request.getRequest(),
            session: this.session.getSession(),
            context: this.context.getContext(),
            version: this.version
        }
    }
}
