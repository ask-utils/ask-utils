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
import { ApplicationFactory } from './application'

export class RequestEnvelopeFactory<T extends RequestFactory = RequestFactory> {
    public applicationId: string = 'amzn1.echo-sdk-ams.app.' + uuid()
    public userId: string = 'amzn1.ask.account.' + uuid()
    public sessionId: string = 'SessionID.' + uuid()
    public requestId: string = 'amzn1.echo-external.request.' + uuid()
    public apiAccessToken: string = 'token'
    public apiEndpoint: string = 'https://api.amazonalexa.com'

    public readonly request: T;
    public readonly context: ContextFactory;
    public readonly session: SessionFactory;
    public readonly user: UserFactory;
    public readonly version = '1.0'

    public constructor (
        request: T,
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
        const application = (new ApplicationFactory()).putId(applicationId)
            .getApplication()

        const user = this.user.putUserId(userId).getUser()
        this.request.setRequestId(requestId)

        this.context.system.putApplication(application)
            .putApiEndpoint(apiEndpoint)
            .putApiAccessToken(apiAccessToken)
            .putUser(user)

        this.session.putSessionId(sessionId)
            .putUser(user)
            .putApplication(application)

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
