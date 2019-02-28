import { HandlerInput } from 'ask-sdk'

export const updateSessionAttributes = (handlerInput: HandlerInput, updateObject: {[attributeName: string]: any}): void => {
    const atts = handlerInput.attributesManager.getSessionAttributes()
    handlerInput.attributesManager.setSessionAttributes(Object.assign(atts, updateObject))
}

export const getSessionAttributes = (handlerInput: HandlerInput): {[attributeName: string]: any} => {
    return handlerInput.attributesManager.getSessionAttributes()
}

export const getSessionAttribute = (handlerInput: HandlerInput, attributeName: string): any => {
    const atts = getSessionAttributes(handlerInput)
    return atts[attributeName]
}
