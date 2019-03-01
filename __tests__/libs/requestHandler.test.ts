import { HandlerInput, RequestHandler } from 'ask-sdk'
import {
    mergeHandler
} from '../../libs/requestHandler'

describe('libs/requestHandler.ts', () => {
    describe('mergeHandler()', () => {
        const handler1: RequestHandler = {
            canHandle (handlerInput: HandlerInput) {
                return handlerInput.requestEnvelope.request.type !== 'LaunchRequest'
            },
            handle (handlerInput) {
                return handlerInput.responseBuilder.speak('test').getResponse()
            }
        }
        const newHandler = mergeHandler(handler1, {
            canHandle (handlerInput: HandlerInput) {
                return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
            }
        })
        const event = {
            requestEnvelope: {
                request: {
                    type: 'LaunchRequest'
                }
            }
        }
        it('should not breake base handler', () => {
            const result = handler1.canHandle(event as HandlerInput)
            expect(result).toEqual(false)
        })
        it('should overwrite the handler', () => {
            const result = newHandler.canHandle(event as HandlerInput)
            expect(result).toEqual(true)
        })
    })
})
