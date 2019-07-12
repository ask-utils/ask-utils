/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Types
} from '../model'

// general
export const isNumber = (arg: any): arg is number => {
    return typeof arg === 'number'
}

export const isString = (arg: any): arg is string => {
    return typeof arg === 'string'
}
export const isObject = (obj: any): obj is {} => {
    if (!obj) return false
    return typeof obj === 'object'
}
export const isEmpty = (obj: any): boolean => {
    if (!isObject(obj)) return true
    return Object.keys(obj).length < 1
}

// specific
export const isCreativeWork = (obj: any): obj is Types.CreativeWork => {
    if (isEmpty(obj)) return false
    if (!obj.name || !obj.contentType) return false
    return true
}
export const isAvailability = (obj: any): obj is Types.Availability => {
    if (isEmpty(obj)) return false
    if (!obj.startTime || !obj.method) return false
    return true
}

export const isWeatherAlert = (obj: any): obj is Types.WeatherAlert => {
    if (isEmpty(obj)) return false
    if (!obj.alertType) return false
    return true
}
export const isMessageState = (obj: any): obj is Types.MessageState => {
    if (isEmpty(obj)) return false
    if (!obj.status) return false
    return true
}

export const isMessageGroup = (obj: any): obj is Types.MessageGroup => {
    if (isEmpty(obj)) return false
    if (!obj.creator || !obj.count) return false
    return true
}

export const isOccasion = (obj: any): obj is Types.Occasion => {
    if (isEmpty(obj)) return false
    if (!obj.occasionType || !obj.subject || !obj.provider || !obj.bookingTime) return false
    return true
}

export const isOrderState = (obj: any): obj is Types.OrderState => {
    if (isEmpty(obj)) return false
    if (!obj.status) return false
    return true
}

export const isGame = (obj: any): obj is Types.Game => {
    if (isEmpty(obj)) return false
    if (!obj.name || !obj.offer) return false
    return true
}
export const isGameInvite = (obj: any): obj is Types.GameInvite => {
    if (isEmpty(obj)) return false
    if (!obj.relationshipToInvitee || !obj.inviter || !obj.inviteType) return false
    return true
}
