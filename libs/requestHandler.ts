import { RequestHandler, HandlerInput } from 'ask-sdk-core'
import {
    interfaces,
    Request
} from 'ask-sdk-model'

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

export const isSkillConnectionResponse = (request: Request): request is interfaces.connections.ConnectionsResponse => {
    return request.type === 'Connections.Response'
}

export const isSkillConnectionRequest = (request: Request): request is interfaces.connections.ConnectionsRequest => {
    return request.type === 'Connections.Request'
}
