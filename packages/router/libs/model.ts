import { HandlerInput } from 'ask-sdk'
import { Response
} from 'ask-sdk-core/node_modules/ask-sdk-model'
import { StateManager, State } from '@ask-utils/situation'

/**
 * Router for ASK SDK v2
 */
interface Situation {
    state?: SituationState;
    custom?: (input: HandlerInput) => boolean | Promise<boolean>;
}

interface SituationState {
    current?: string;
    next?: string;
}

export interface HandlerHelpers<T extends State = State> {
    stateManager: StateManager<T>;
}
export type RouterHandler<T extends State = State> = (handlerInput: HandlerInput, helpers: HandlerHelpers<T>) => Response | Promise<Response>

export interface Router<T extends State = State> {
    requestType: string;
    intentName?: string;
    situation?: Situation;
    handler: RouterHandler<T>;
}
