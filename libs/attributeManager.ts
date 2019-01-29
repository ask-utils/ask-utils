import {HandlerInput} from 'ask-sdk';
export const updateSessionAttributes = (handlerInput: HandlerInput, updateObject: {[attributeName: string]: string}): void => {
  const atts = handlerInput.attributesManager.getSessionAttributes()
  handlerInput.attributesManager.setSessionAttributes(Object.assign(atts, updateObject))
}
export const getSessionAttribute = (handlerInput: HandlerInput, attributeName: string): string => {
  const atts = getSessionAttributes(handlerInput)
  return atts[attributeName]
}

export const getSessionAttributes = (handlerInput: HandlerInput): {[attributeName: string]: string} => {
  return handlerInput.attributesManager.getSessionAttributes()
}