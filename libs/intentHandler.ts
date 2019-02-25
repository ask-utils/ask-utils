import * as Ask from 'ask-sdk'
import {
    Request,
    RequestEnvelope,
    IntentRequest,
    Intent,
    Context,
    interfaces
} from 'ask-sdk-model'
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
export const getSystemState = (handlerInput: HandlerInput): interfaces.system.SystemState => {
    return handlerInput.context.system
}
export const getContext = (handlerInput: HandlerInput): Context => {
    return handlerInput.context
}
export const getRequestContext = (handlerInput: HandlerInput): Context => {
    return handlerInput.requestEnvelope.context
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
    return isMatchedRequestType(handlerInput, 'LaunchRequest')
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

// get objects
export const getLocale = (handlerInput: HandlerInput, defaultLocale: string = 'en-US'): string => {
    const request = getRequest(handlerInput)
    return request.locale || defaultLocale
}
export const getAudioPlayerState = (handlerInput: HandlerInput): interfaces.audioplayer.AudioPlayerState | null => {
    const context = getRequestContext(handlerInput)
    return context.AudioPlayer || null
}
export const getDisplayState = (handlerInput: HandlerInput): interfaces.display.DisplayState | null => {
    const context = getRequestContext(handlerInput)
    return context.Display || null
}
export const getGeolocationState = (handlerInput: HandlerInput): interfaces.geolocation.GeolocationState | null => {
    const context = getRequestContext(handlerInput)
    return context.Geolocation || null
}
export const getViewportState = (handlerInput: HandlerInput): interfaces.viewport.ViewportState | null => {
    const context = getRequestContext(handlerInput)
    return context.Viewport || null
}
export const getIntent = (handlerInput: HandlerInput): Intent | {} => {
    const request = getRequest(handlerInput)
    if (!isIntentRequestType(request)) return {}
    return request.intent
}
