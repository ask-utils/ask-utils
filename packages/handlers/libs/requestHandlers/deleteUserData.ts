import { HandlerInput, getRequestType, RequestHandler } from 'ask-sdk-core'
import { createAskSdkError } from 'ask-sdk-runtime'

export const DeleteDisabledUserHandler: RequestHandler = {
    canHandle (handlerInput: HandlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'AlexaSkillEvent.SkillDisabled'
    },
    async handle (handlerInput: HandlerInput) {
        const { deletePersistentAttributes } = handlerInput.attributesManager
        if (!deletePersistentAttributes) throw createAskSdkError('DeleteDisabledUserHandler', 'deletePersistentAttributes is not defined. Please upgrade your ask-sdk.')
        await deletePersistentAttributes()
        return handlerInput.responseBuilder.getResponse()
    }
}
export default DeleteDisabledUserHandler
