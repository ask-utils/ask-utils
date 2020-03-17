
import { StateManager, State } from '@ask-utils/situation'
import { RequestHandler } from 'ask-sdk'
import {
    Response
} from 'ask-sdk-core/node_modules/ask-sdk-model'
import {
    RouteMatcher
} from '../matcher'
import {
    Router
} from '../model'

const getStateFromRoute = <T extends State = State>(route: Router<T>): T | undefined => {
    const { situation } = route
    if (!situation || !situation.state) return undefined
    return situation.state as T
}

export class RequestHandlerFactory<T extends State = State> {
    private router: Router<T>[] = []

    public addRoutes (...routers: Router<T>[]): this {
        this.router = [...this.router, ...routers]
        return this
    }

    public createHandlers (): RequestHandler[] {
        return this.router.map(route => {
            return RequestHandlerFactory.create<T>(route)
        })
    }

    public static create<T extends State = State> (route: Router<T>): RequestHandler {
        const expectedState = getStateFromRoute(route)
        return {
            async canHandle (handlerInput): Promise<boolean> {
                const matcher = new RouteMatcher<T>(handlerInput, route)
                await matcher.match()
                return matcher.getMatchResult()
            },
            handle: (input): Response | Promise<Response> => {
                const stateManager = new StateManager<T>(input.attributesManager, expectedState)
                const result = route.handler(input, {
                    stateManager
                })
                return result
            }
        }
    }
}
