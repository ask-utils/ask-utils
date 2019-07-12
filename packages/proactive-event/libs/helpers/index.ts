import {
    Types
} from '../model'
import {
    isAvailability,
    isCreativeWork,
    isWeatherAlert,
    isMessageState,
    isMessageGroup,
    isOccasion,
    isOrderState,
    isGame,
    isGameInvite
} from './typeGuards'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCreativeWork = (obj: any): Types.CreativeWork => {
    if (isCreativeWork(obj)) {
        const { name, contentType } = obj
        const newProps: Types.CreativeWork = { name, contentType }
        return newProps
    }
    throw new Error('Invalid creative work object')
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAvailability = (obj: any): Types.Availability => {
    if (isAvailability(obj)) {
        const { method, startTime, provider } = obj
        const newProps: Types.Availability = { method, startTime }
        if (provider) newProps.provider = provider
        return newProps
    }
    throw new Error('Invalid Availability object')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getWeatherAlert = (obj: any): Types.WeatherAlert => {
    if (isWeatherAlert(obj)) {
        const { alertType, source } = obj
        const newProps: Types.WeatherAlert = { alertType }
        if (source) newProps.source = source
        return newProps
    }
    throw new Error('Invalid WeatherAlert object')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMessageState = (obj: any): Types.MessageState => {
    if (isMessageState(obj)) {
        const { status, freshness } = obj
        const newProps: Types.MessageState = { status }
        if (freshness) newProps.freshness = freshness
        return newProps
    }
    throw new Error('Invalid MessageState object')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMessageGroup = (obj: any): Types.MessageGroup => {
    if (isMessageGroup(obj)) {
        const { creator, count, urgency } = obj
        const newProps: Types.MessageGroup = { creator, count }
        if (urgency) newProps.urgency = urgency
        return newProps
    }
    throw new Error('Invalid MessageGroup object')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getOccasion = (obj: any): Types.Occasion => {
    if (isOccasion(obj)) {
        const { occasionType, subject, provider, bookingTime, broker } = obj
        const newProps: Types.Occasion = { occasionType, subject, provider, bookingTime }
        if (broker) newProps.broker = broker
        return newProps
    }
    throw new Error('Invalid Occasion object')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getOrderState = (obj: any): Types.OrderState => {
    if (isOrderState(obj)) {
        const { status, enterTimestamp, deliveryDetails } = obj
        const newProps: Types.OrderState = { status }
        if (enterTimestamp) newProps.enterTimestamp = enterTimestamp
        if (deliveryDetails) newProps.deliveryDetails = deliveryDetails
        return newProps
    }
    throw new Error('Invalid OrderState object')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getGame = (obj: any): Types.Game => {
    if (isGame(obj)) {
        const { offer, name } = obj
        return { offer, name }
    }
    throw new Error('Invalid Game object')
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getGameInvite = (obj: any): Types.GameInvite => {
    if (isGameInvite(obj)) {
        const { inviteType, inviter, relationshipToInvitee } = obj
        return { inviteType, inviter, relationshipToInvitee }
    }
    throw new Error('Invalid GameInvite object')
}
