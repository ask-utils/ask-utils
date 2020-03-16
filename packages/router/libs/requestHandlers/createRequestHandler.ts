import {
    RouteMatcher
} from '../matcher'
import {
    CreateRequestHandlers,
    CreateRequestHandler
} from '../model'

export const createRequestHandler: CreateRequestHandler = (route) => {
    return {
        async canHandle (handlerInput) {
            const matcher = new RouteMatcher(handlerInput, route)
            await matcher.match()
            return matcher.getMatchResult()
        },
        handle: route.handler
    }
}

export const createRequestHandlers: CreateRequestHandlers = (routes) => {
    return routes.map(createRequestHandler)
}
