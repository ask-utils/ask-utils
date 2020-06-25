import {
    Application
} from 'ask-sdk-model' // 'ask-sdk-core/node_modules/ask-sdk-model'
export class ApplicationFactory {
    private readonly app: Application = {
        applicationId: ''
    }

    public putId (id: string): this {
        this.app.applicationId = id
        return this
    }

    public getApplication (): Application {
        return this.app
    }
}
