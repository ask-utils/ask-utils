import {
    Session
} from 'ask-sdk-core/node_modules/ask-sdk-model'

export class SessionFactory {
    protected session: Session = {
        new: true,
        sessionId: '',
        application: {
            applicationId: ''
        },
        user: {
            userId: ''
        }
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
