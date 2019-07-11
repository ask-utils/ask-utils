import { isLaunchRequest } from 'ask-utils'
import { HandlerBuilder } from './Base'
import {
    CanHandle, CanHandleResponse
} from './model'

export class LaunchRequestrBuilder extends HandlerBuilder {
    public canHandle: CanHandle = (handlerInput): CanHandleResponse => {
        if (!isLaunchRequest(handlerInput)) return false
        return this.canHandleFilter(handlerInput)
    }
}
export default LaunchRequestrBuilder
