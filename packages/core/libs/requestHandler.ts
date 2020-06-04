import { RequestHandler, HandlerInput } from 'ask-sdk-core'
import {
    Response,
    RequestEnvelope
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

export const isSkillEvent = (requestEnvelope: RequestEnvelope): boolean => {
    return /^AlexaSkillEvent/.test(requestEnvelope.request.type)
}

export const isAudioPlayerRequest = (requestEnvelope: RequestEnvelope): boolean => {
    return /^AudioPlayer/.test(requestEnvelope.request.type)
}
