import {
    Context
} from 'ask-sdk-core/node_modules/ask-sdk-model'

export class ContextFactory {
    public getContext (): Context {
        return {
            System: {
                application: {
                    applicationId: ''
                },
                user: {
                    userId: ''
                },
                apiEndpoint: ''
            }
        }
    }
}
