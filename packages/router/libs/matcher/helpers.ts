import {
    isIntentRequestType
} from '@ask-utils/core'
import {
    Request
} from 'ask-sdk-core/node_modules/ask-sdk-model'
import {
    Router
} from '../model'

export const shouldMatchRequestType = (request: Request, route: Router): boolean => {
    if (request.type !== route.requestType) return false
    return true
}
export const shouldMatchIntentRequest = (request: Request, route: Router): boolean => {
    if (!isIntentRequestType(request)) return false
    if (!route.intentName) return true
    return route.intentName === request.intent.name
}
