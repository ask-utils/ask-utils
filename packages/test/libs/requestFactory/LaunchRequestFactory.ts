import {
    RequestFactory
} from './RequestFactory'
import { LaunchRequest, Task } from 'ask-sdk-core/node_modules/ask-sdk-model'

export class LaunchRequestFactory extends RequestFactory<LaunchRequest> {
    public constructor (locale: string = 'en-US') {
        super('LaunchRequest', locale)
    }

    public setTask (task: Task): this {
        this.updateRequest({
            task
        })
        return this
    }
}
