import { RequestHandler, HandlerInput } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'

export type CanHandleResponse = Promise<boolean> | boolean
export type HandleResponse = Promise<Response> | Response
export type CanHandle = (handlerInput: HandlerInput) => CanHandleResponse
export type Handle = (handlerInput: HandlerInput) => Promise<Response> | Response
export interface HandlerBuilderInterface {
    canHandle: CanHandle;
    handle: Handle;
    setHandleCondition(condition: CanHandle): HandlerBuilderInterface;
    setHandle(handle: Handle): HandlerBuilderInterface;
    updateHandler(condition: CanHandle, handle: Handle): HandlerBuilderInterface;
    replaceHandler(handler: Partial<RequestHandler>): HandlerBuilderInterface;
    getHandler(): RequestHandler;
}
