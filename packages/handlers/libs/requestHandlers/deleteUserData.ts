import { HandlerInput, getRequestType } from 'ask-sdk-core'
import { createAskSdkError } from 'ask-sdk-runtime'

export const DeleteDisabledUserHandler = {
    canHandle (handlerInput: HandlerInput): boolean {
        return getRequestType(handlerInput.requestEnvelope) === 'AlexaSkillEvent.SkillDisabled'
    },
    async handle (handlerInput: HandlerInput): Promise<void> {
        const { deletePersistentAttributes } = handlerInput.attributesManager
        if (!deletePersistentAttributes) throw createAskSdkError('DeleteDisabledUserHandler', 'deletePersistentAttributes is not defined. Please upgrade your ask-sdk.')
        await deletePersistentAttributes()
    }
}
export default DeleteDisabledUserHandler
