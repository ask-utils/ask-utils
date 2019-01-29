import {HandlerInput} from 'ask-sdk';
export const isConsented = (handlerInput: HandlerInput): boolean => {
  const {permissions} = handlerInput.requestEnvelope.context.System.user
  if (!permissions || !permissions.consentToken) return false
  return true
}
