import { HandlerInput, getApiAccessToken } from 'ask-sdk-core'
import { services } from 'ask-sdk-model'
import { hasServiceClientFactory } from './serviceClient'
export const getRandomMessage = (messages: string[]): string => {
    if (!messages || messages.length === 0) return ''
    const key = Math.floor(Math.random() * messages.length)
    return messages[key]
}

export type ProgressiveResponseErrorHandler = (e: Error) => void

/**
 * Send Progressive Response
 *
 * @param handlerInput ASK-SDK handler input
 * @param speech speech text (string or SSML string)
 * @param errorHandler error handler function (optional)
 * @example
 * import { enqueueProgressiveResponse } from 'ask-utils'
 *
 * await enqueueProgressiveResponse(handlerInput, 'Now your data processing')
 */
export const enqueueProgressiveResponse = async (handlerInput: HandlerInput, speech: string, errorHandler?: ProgressiveResponseErrorHandler): Promise<void> => {
    const { serviceClientFactory, requestEnvelope } = handlerInput
    if (hasServiceClientFactory(serviceClientFactory)) {
        const client = serviceClientFactory.getDirectiveServiceClient()
        const { requestId } = requestEnvelope.request
        const payload: services.directive.SendDirectiveRequest = {
            header: {
                requestId
            },
            directive: {
                type: 'VoicePlayer.Speak',
                speech
            }
        }
        try {
            client.enqueue(payload)
        } catch (e) {
            if (errorHandler) errorHandler(e)
        }
    }
}
