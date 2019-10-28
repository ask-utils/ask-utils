import { HandlerInput, getSupportedInterfaces as coreGetSupportedInterfaces } from 'ask-sdk-core'
import { Device, SupportedInterfaces, interfaces, RequestEnvelope } from 'ask-sdk-model'

export const getDevice = (handlerInput: HandlerInput): Device | undefined => {
    return handlerInput.requestEnvelope.context.System.device
}

export const getDeviceId = (handlerInput: HandlerInput): string | null => {
    const device = getDevice(handlerInput)
    if (!device) return null
    return device.deviceId
}

export const getSupportedInterfaces = (handlerInput: HandlerInput): SupportedInterfaces | null => {
    const device = getDevice(handlerInput)
    if (!device) return null
    return device.supportedInterfaces
}

export const getAudioPlayerInterface = (handlerInput: HandlerInput): interfaces.audioplayer.AudioPlayerInterface | {} => {
    const supportedInterfaces = getSupportedInterfaces(handlerInput)
    if (!supportedInterfaces) return {}
    return supportedInterfaces.AudioPlayer || {}
}

export const getGeolocationInterface = (handlerInput: HandlerInput): interfaces.geolocation.GeolocationInterface | {} => {
    const supportedInterfaces = getSupportedInterfaces(handlerInput)
    if (!supportedInterfaces) return {}
    return supportedInterfaces.Geolocation || {}
}
export const getAPLInterface = (handlerInput: HandlerInput): interfaces.alexa.presentation.apl.AlexaPresentationAplInterface | {} => {
    const supportedInterfaces = getSupportedInterfaces(handlerInput)
    if (!supportedInterfaces) return {}
    return supportedInterfaces['Alexa.Presentation.APL'] || {}
}
export const getVideoAppInterface = (handlerInput: HandlerInput): interfaces.videoapp.VideoAppInterface | {} => {
    const supportedInterfaces = getSupportedInterfaces(handlerInput)
    if (!supportedInterfaces) return {}
    return supportedInterfaces.VideoApp || {}
}
export const getDisplayInterface = (handlerInput: HandlerInput): interfaces.display.DisplayInterface | {} => {
    const supportedInterfaces = getSupportedInterfaces(handlerInput)
    if (!supportedInterfaces) return {}
    return supportedInterfaces.Display || {}
}

/**
 * APLをサポートしているリクエストかどうか
 * @param request
 */
export const hasAPL = (request: RequestEnvelope): boolean => {
    const interfaces = coreGetSupportedInterfaces(request)
    return !!(interfaces['Alexa.Presentation.APL'])
}
