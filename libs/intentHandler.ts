import * as Ask from 'ask-sdk';
import {Request, RequestEnvelope, IntentRequest} from 'ask-sdk-model';

import HandlerInput = Ask.HandlerInput

export const getRequestEnvelope = (handlerInput: HandlerInput): RequestEnvelope => {
    return handlerInput.requestEnvelope
}
export const getRequest = (handlerInput: HandlerInput): Request => {
    return handlerInput.requestEnvelope.request
}
export const getRequestType = (handlerInput: HandlerInput): string => {
    return handlerInput.requestEnvelope.request.type
}
// intentRequest helpers
export const isMatchedIntentName = (request: IntentRequest, intentName: string): boolean => {
    return request.intent.name === intentName
}
export const isMatchedRequestType = (handlerInput: HandlerInput, type: string): boolean => {
    return type === getRequestType(handlerInput)
}
export const isIntentRequestType = (request: Request): request is IntentRequest => {
    return request.type === 'IntentRequest'
}

// request matcher
export const isIntentRequest = (handlerInput: HandlerInput): boolean => {
    return isMatchedRequestType(handlerInput, 'IntentRequest')
}
export const isMatchedIntent = (handlerInput: HandlerInput, intentName: string): boolean => {
    const request: Request = getRequest(handlerInput)
    if (!isIntentRequestType(request)) return false
    return isMatchedIntentName(request, intentName)
}
export const isLaunchRequest = (handlerInput: HandlerInput): boolean => {
    return isMatchedRequestType(handlerInput,'LaunchRequest')
}
export const isHelpIntent = (handlerInput: HandlerInput): boolean => {
    return isMatchedIntent(handlerInput, 'AMAZON.HelpIntent')
}
export const isYesIntent = (handlerInput: HandlerInput): boolean => {
    return isMatchedIntent(handlerInput, 'AMAZON.YesIntent')
}
export const isNoIntent = (handlerInput: HandlerInput): boolean => {
    return isMatchedIntent(handlerInput, 'AMAZON.NoIntent')
}
export const isStopIntent = (handlerInput: HandlerInput): boolean => {
    return isMatchedIntent(handlerInput, 'AMAZON.StopIntent')
}
export const isCancelIntent = (handlerInput: HandlerInput): boolean => {
    return isMatchedIntent(handlerInput, 'AMAZON.CancelIntent')
}
