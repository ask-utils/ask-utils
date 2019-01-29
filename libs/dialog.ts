import { HandlerInput } from 'ask-sdk'
import {IntentRequest, DialogState, Request} from 'ask-sdk-model';

// fixture
import { getRequest, isIntentRequestType } from './intentHandler'

export const getDialogState = (request: IntentRequest): DialogState => {
  return request.dialogState
}

export const getDialogStateFromHandler = (handlerInput: HandlerInput): DialogState | '' => {
  const request: Request = getRequest(handlerInput)
  if (!isIntentRequestType(request)) return ''
  return getDialogState(request)
}

export const isMatchedDialogState = (handlerInput: HandlerInput, state: string): boolean => {
  const dialogState = getDialogStateFromHandler(handlerInput)
  if (!dialogState) return false
  return dialogState === state
}
export const isDialogStarted = (handlerInput: HandlerInput): boolean => {
  return isMatchedDialogState(handlerInput, 'STARTED')
}

export const isDialogInprogress = (handlerInput: HandlerInput): boolean => {
  return isMatchedDialogState(handlerInput, 'IN_PROGRESS')
}

export const isDialogCompleted = (handlerInput: HandlerInput): boolean => {
  return isMatchedDialogState(handlerInput, 'COMPLETED')
}