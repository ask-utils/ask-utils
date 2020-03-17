import {
    isIntentRequestType
} from '@ask-utils/core'
import {
    State
} from '@ask-utils/situation'
import {
    Request
} from 'ask-sdk-core/node_modules/ask-sdk-model'
import {
    Router
} from '../model'

export const shouldMatchRequestType = <T extends State = State>(request: Request, route: Router<T>): boolean => {
    if (request.type !== route.requestType) return false
    return true
}
export const shouldMatchIntentRequest = <T extends State = State>(request: Request, route: Router<T>): boolean => {
    if (!isIntentRequestType(request)) return false
    if (!route.intentName) return true
    return route.intentName === request.intent.name
}
