import {
    User,
    Session,
    Application
} from 'ask-sdk-model' // 'ask-sdk-core/node_modules/ask-sdk-model'
import { v4 as uuid } from 'uuid'

export interface SessionAttribute {
    [key: string]: any;
}

export class SessionFactory {
    protected session: Session = {
        new: true,
        sessionId: 'SessionID.' + uuid(),
        application: {
            applicationId: ''
        },
        user: {
            userId: ''
        }
    }

    public putApplication (app: Application): this {
        this.session.application = app
        return this
    }

    public putSessionId (sessionId: string): this {
        this.session.sessionId = sessionId
        return this
    }
    public putUser (user: User): this {
        this.session.user = user
        return this
    }

    public putAttributes<T extends SessionAttribute = SessionAttribute> (attributes: T): this {
        this.session.attributes = attributes
        return this
    }

    public isNewSession (status: boolean): this {
        this.session.new = status
        return this
    }

    public putSession (session: Session): this {
        this.session = session
        return this
    }
    public getSession (): Session {
        return this.session
    }
}
