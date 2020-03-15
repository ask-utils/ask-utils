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
    public getSession (): Session {
        return this.session
    }
}
