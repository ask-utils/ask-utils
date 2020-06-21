import {
    isIntentRequestType
} from '@ask-utils/core'
import {
    State
} from '@ask-utils/situation'
import {
    Request
} from 'ask-sdk-model' // 'ask-sdk-core/node_modules/ask-sdk-model'
import {
    Router
} from '../model'

export const shouldMatchRequestType = <T extends State = State>(request: Request, route: Router<T>): boolean => {
    if (request.type !== route.requestType) return false
    return true
}
export const shouldMatchIntentRequest = <T extends State = State>(request: Request, route: Router<T>): boolean => {
    if (!isIntentRequestType(request)) return false
    /**
     * If the route handler expect to NOT IntentRequest, should return false
     */
    if (route.requestType !== 'IntentRequest') return false
    if (!route.intentName) return true
    if (typeof route.intentName === 'string') {
        return route.intentName === request.intent.name
    }
    const matchedIntentName = route.intentName.find(name => name === request.intent.name)
    return !!(matchedIntentName)
}
