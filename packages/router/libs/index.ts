import { RequestHandler, HandlerInput } from 'ask-sdk'
import {
    getRequest,
    isIntentRequestType
} from '@ask-utils/core'
import { Response, Request } from 'ask-sdk-model'

/**
 * Router for ASK SDK v2
 */
interface Condition {
    state?: string;
    custom?: (input: HandlerInput) => boolean | Promise<boolean>;
}

type Handler = (handlerInput: HandlerInput) => Response | Promise<Response>

interface Router {
    requestType: string;
    intentName?: string;
    condition?: Condition;
    handler: Handler;
}
type CreateRequestHandler = (route: Router) => RequestHandler
type CreateRequestHandlers = (routes: Router[]) => RequestHandler[]

const shouldMatchRequestType = (request: Request, route: Router): boolean => {
    if (request.type !== route.requestType) return false
    return true
}
const shouldMatchIntentRequest = (request: Request, route: Router): boolean => {
    if (!isIntentRequestType(request)) return false
    if (!route.intentName) return true
    return route.intentName === request.intent.name
}

class RouteMatcher {
    private readonly input: HandlerInput
    private readonly request: Request
    private readonly targetRoute: Router
    private canHandle: boolean = false
    public constructor (input: HandlerInput, targetRoute: Router) {
        this.input = input
        this.request = getRequest(input)
        this.targetRoute = targetRoute
    }
    private async executeCustomCondition (): Promise<void> {
        if (!this.targetRoute.condition || !this.targetRoute.condition.custom) return
        this.canHandle = await this.targetRoute.condition.custom(this.input)
    }
    public async match (): Promise<void> {
        const {
            request, targetRoute
        } = this
        /**
         * If request type unmatch, always return false
         */
        if (!shouldMatchRequestType(request, targetRoute)) {
            this.canHandle = false
            return
        }
        /**
         * If the request is intent request should check the intent name
         */
        if (!isIntentRequestType(this.request)) {
            this.canHandle = shouldMatchIntentRequest(request, targetRoute)
        }

        /**
         * Execute custom matcher function
         */
        await this.executeCustomCondition()
    }
    public getMatchResult (): boolean {
        return this.canHandle
    }
}

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
