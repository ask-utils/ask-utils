import { RequestHandler, HandlerInput } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
export const cloneHandler = (cloneTarget: RequestHandler): RequestHandler => {
    return Object.assign({}, cloneTarget)
}

interface MergeObjectType {
    canHandle?: (handlerInput: HandlerInput) => boolean;
    handle?: (handlerInput: HandlerInput) => Response;
}

export const mergeHandler = (cloneTarget: RequestHandler, mergeObject: MergeObjectType): RequestHandler => {
    return Object.assign({}, cloneTarget, mergeObject)
}
