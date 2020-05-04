
import { StateManager, State, InitialState } from '@ask-utils/situation'
import { RequestHandler } from 'ask-sdk'
import {
    Response
} from 'ask-sdk-model' // 'ask-sdk-core/node_modules/ask-sdk-model'
import {
    RouteMatcher
} from '../matcher'
import {
    Router,
    Situation
} from '../model'

const getSituation = <T extends State = State>(route: Router<T>): Situation | undefined => {
    const { situation } = route
    return situation || undefined
}
const getStateFromRoute = <T extends State = State>(route: Router<T>): InitialState<T> | undefined => {
    const situation = getSituation(route)
    if (!situation || !situation.state) return undefined
    return situation.state as InitialState<T>
}

export class RequestHandlerFactory<T extends State = State> {
    private router: Router<T>[] = []

    public addRoutes (...routers: Router<T>[]): this {
        this.router = [...this.router, ...routers]
        return this
    }

    public createHandlers (): RequestHandler[] {
        return this.router.map((route): RequestHandler => {
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
                /**
                 * Auto state updator
                 */
                if (expectedState) {
                    const { current, next } = expectedState
                    if (current && next) {
                        stateManager.setState(next, [], [current])
                    }
                }
                const situation = getSituation(route)
                if (situation && situation.shouldEndSession !== undefined) {
                    input.responseBuilder.withShouldEndSession(situation.shouldEndSession)
                }
                const result = route.handler(input, {
                    stateManager
                })
                return result
            }
        }
    }
}
