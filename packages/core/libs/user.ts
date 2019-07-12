import { HandlerInput } from 'ask-sdk'
import { Session, RequestEnvelope } from 'ask-sdk-model'
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

export const isGrantedUserPermission = (requestEnvelope: RequestEnvelope, scope: string): boolean => {
    const permissions = requestEnvelope.context.System.user.permissions
    if (!permissions) return false
    if (!permissions.consentToken) return false
    const { scopes } = permissions
    if (!scopes) return true
    return scopes[scope] && scopes[scope].status === 'GRANTED'
}
