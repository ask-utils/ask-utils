import {
    HandlerInput
} from 'ask-sdk-core'
import {
    interfaces,
    Request
} from 'ask-sdk-model'

import ConnectionsResponse = interfaces.connections.ConnectionsResponse
import ConnectionsRequest = interfaces.connections.ConnectionsRequest

export const isSkillConnectionResponse = (request: Request): request is ConnectionsResponse => {
    return request.type === 'Connections.Response'
}

export const isSkillConnectionRequest = (request: Request): request is ConnectionsRequest => {
    return request.type === 'Connections.Request'
}

export const isUpsellConnectionResponse = (handlerInput: HandlerInput): boolean => {
    const { request } = handlerInput.requestEnvelope
    if (!isSkillConnectionResponse(request)) return false
    return request.name === 'Upsell'
}
export const isCancelConnectionResponse = (handlerInput: HandlerInput): boolean => {
    const { request } = handlerInput.requestEnvelope
    if (!isSkillConnectionResponse(request)) return false
    return request.name === 'Cancel'
}
export const isBuyConnectionResponse = (handlerInput: HandlerInput): boolean => {
    const { request } = handlerInput.requestEnvelope
    if (!isSkillConnectionResponse(request)) return false
    return request.name === 'Buy'
}
