import {
RequestFactory
} from './RequestFactory'
import {LaunchRequest, Task}from 'ask-sdk-core/node_modules/ask-sdk-model'

export class LaunchRequestFactory extends RequestFactory<LaunchRequest> {
	constructor(locale: string = 'en-US') {
		super("LaunchRequest", locale)
	}

    setTask(task: Task) {
        this.updateRequest({
            task
        })
        return this
    }
}