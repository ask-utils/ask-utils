import { RequestHandler, HandlerInput } from 'ask-sdk'
import { Response
} from 'ask-sdk-core/node_modules/ask-sdk-model'

/**
 * Router for ASK SDK v2
 */
interface Situation {
    state?: string;
    custom?: (input: HandlerInput) => boolean | Promise<boolean>;
}

type Handler = (handlerInput: HandlerInput) => Response | Promise<Response>

export interface Router {
    requestType: string;
    intentName?: string;
    situation?: Situation;
    handler: Handler;
}
export type CreateRequestHandler = (route: Router) => RequestHandler
export type CreateRequestHandlers = (routes: Router[]) => RequestHandler[]
