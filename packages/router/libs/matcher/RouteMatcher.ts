
import {
    HandlerInput
} from 'ask-sdk-core'
import {
    getRequest,
    isIntentRequestType
} from '@ask-utils/core'
import {
    Request
} from 'ask-sdk-core/node_modules/ask-sdk-model'
import {
    Router
} from '../model'
import {
    shouldMatchIntentRequest,
    shouldMatchRequestType
} from './helpers'

export class RouteMatcher {
    private readonly input: HandlerInput
    private readonly request: Request
    private readonly targetRoute: Router
    private canHandle: boolean = false
    public constructor (input: HandlerInput, targetRoute: Router) {
        this.input = input
        this.request = getRequest(input)
        this.targetRoute = targetRoute
    }
    private async executeCustomSituation (): Promise<void> {
        if (!this.targetRoute.situation || !this.targetRoute.situation.custom) return
        this.canHandle = await this.targetRoute.situation.custom(this.input)
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
        if (isIntentRequestType(this.request)) {
            this.canHandle = shouldMatchIntentRequest(request, targetRoute)
        }

        /**
         * Execute custom matcher function
         */
        await this.executeCustomSituation()
    }
    public getMatchResult (): boolean {
        return this.canHandle
    }
}
