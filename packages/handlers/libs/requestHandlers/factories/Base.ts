import { RequestHandler } from 'ask-sdk-core'
import {
    CanHandle, Handle, HandlerBuilderInterface,
    CanHandleResponse, HandleResponse
} from './model'
export class HandlerBuilder implements HandlerBuilderInterface {
    protected canHandleFilter: CanHandle = (): CanHandleResponse => true
    protected handlerFilter: Handle = (handlerInput): HandleResponse => { throw new Error(`Unsupported request: ${JSON.stringify(handlerInput)}`) }
    public canHandle: CanHandle = (handlerInput): CanHandleResponse => {
        return this.canHandleFilter(handlerInput)
    }
    public handle: Handle = (handlerInput): HandleResponse => {
        return this.handlerFilter(handlerInput)
    }
    public setHandleCondition (condition: CanHandle): this {
        this.canHandleFilter = condition
        return this
    }
    public setHandle (handle: Handle): this {
        this.handlerFilter = handle
        return this
    }
    public updateHandler (condition: CanHandle, handle: Handle): this {
        this.setHandle(handle)
        this.setHandleCondition(condition)
        return this
    }
    public replaceHandler (handler: Partial<RequestHandler>): this {
        if (handler.canHandle) this.setHandleCondition(handler.canHandle)
        if (handler.handle) this.setHandle(handler.handle)
        return this
    }
    public getHandler (): RequestHandler {
        return {
            canHandle: this.canHandle,
            handle: this.handle
        }
    }
}
export default HandlerBuilder
