import {
    AttributesManager
} from 'ask-sdk-core'
export type DefaultState = string

/**
 * State manager class
 * @example
 * ```
 * type NEWSTATE = 'BYE' | 'HELLO'
 * export const updateState = (attributeManager: AttributesManager): void => StateManager.updateState<NEWSTATE>(attributeManager, 'HELLO')
 * export const getState = (attributeManager: AttributesManager): NEWSTATE => StateManager.getCurrentState<NEWSTATE>(attributeManager)
 * export const isHelloState = (attributeManager: AttributesManager): boolean => {
 *   const state = getState(attributeManager)
 *   return state === 'HELLO'
 * }
 * const TestHandler: RequestHandler = {
 *   canHandle(handlerInput) {
 *     if (handlerInput.requestEnvelope.request.type !== 'LaunchRequest') return false
 *     return isHelloState(handlerInput.attributesManager)
 *   },
 *   handle(handlerInput) {
 *     ...
 *   }
 * }
 * ```
 */
export class StateManager {
    public static updateState<T = DefaultState> (attributeManager: AttributesManager, state: T): void {
        attributeManager.setSessionAttributes({
            ...attributeManager.getSessionAttributes(),
            state
        })
    }

    public static getCurrentState<T = DefaultState> (attributeManager: AttributesManager): T {
        const att = attributeManager.getSessionAttributes()
        return att.state || ''
    }

    public static resetState (attributeManager: AttributesManager): void {
        this.updateState(attributeManager, '')
    }

    public static isMatchedState<T = DefaultState> (attributeManager: AttributesManager, state: T): boolean {
        return state === this.getCurrentState<T>(attributeManager)
    }
}
