import {
    User,
    Session
} from 'ask-sdk-core/node_modules/ask-sdk-model'
import { v4 as uuid } from 'uuid'

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

    public putSessionId (sessionId: string): this {
        this.session.sessionId = sessionId
        return this
    }
    public putUser (user: User): this {
        this.session.user = user
        return this
    }

    public enableNewSessionFlag (): this {
        this.session.new = true
        return this
    }
    public disableNewSessionFlag (): this {
        this.session.new = false
        return this
    }
    public getSession (): Session {
        return this.session
    }
}
