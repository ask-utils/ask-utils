import { IntentRequest } from 'ask-sdk-model'
import { HandlerInput } from 'ask-sdk-core'
import {
    HandlerFactory
} from '../../../../libs/requestHandlers/factories/index'

describe('libs/requestHandlers/factories/Index.ts', () => {
    describe('Class HandlerFactory', () => {
        describe('default', () => {
            it('should return default handler (pass all request)', () => {
                const handler = HandlerFactory.init('LaunchRequest')
                expect(handler.canHandle({} as HandlerInput))
                    .toEqual(true)
            })
            it('should throw error if no handle added', () => {
                const handler = HandlerFactory.init('LaunchRequest')
                expect(() => handler.handle({} as HandlerInput))
                    .toThrow()
            })
        })
        describe('intentRequest', () => {
            const request: IntentRequest = {
                type: 'IntentRequest',
                requestId: 'aaa',
                timestamp: 'bbb',
                dialogState: 'STARTED',
                intent: {
                    name: 'TestIntent',
                    confirmationStatus: 'CONFIRMED'
                }
            }
            const handlerInput = {
                requestEnvelope: {
                    request
                }
            } as HandlerInput
            it('should return true if unmatched request', () => {
                const handler = HandlerFactory.init('IntentRequest', 'TestIntent')
                expect(handler.canHandle(handlerInput))
                    .toEqual(true)
            })
            it('should return false if unmatched request', () => {
                const handler = HandlerFactory.init('IntentRequest', 'Test2Intent')
                expect(handler.canHandle(handlerInput))
                    .toEqual(false)
            })
        })
    })
})
