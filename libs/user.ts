import { HandlerInput } from 'ask-sdk'
import { Session } from 'ask-sdk-model'
export const isConsented = (handlerInput: HandlerInput): boolean => {
    const { permissions } = handlerInput.requestEnvelope.context.System.user
    if (!permissions || !permissions.consentToken) return false
    return true
}

export const getUserId = (handlerInput: HandlerInput): string => {
    return handlerInput.requestEnvelope.context.System.user.userId
}

export const getSession = (handlerInput: HandlerInput): Session | null => {
    return handlerInput.requestEnvelope.session || null
}

export const isNewSession = (handlerInput: HandlerInput): boolean => {
    const session = getSession(handlerInput)
    if (!session) return false
    return session.new || false
}

export const getSessionId = (handlerInput: HandlerInput): string => {
    const session = getSession(handlerInput)
    if (!session) return ''
    return session.sessionId || ''
}
