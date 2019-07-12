import { IntentRequest, LaunchRequest } from 'ask-sdk-model'
import { HandlerInput } from 'ask-sdk-core'
import {
    IntentHandlerBuilder
} from '../../../../libs/requestHandlers/factories/Intent'

describe('libs/requestHandlers/factories/Intent.ts', () => {
    describe('Class IntentHandlerBuilder', () => {
        const intentName = 'TestIntent'
        let builder = new IntentHandlerBuilder(intentName)
        // eslint-disable-next-line no-return-assign
        beforeEach(() => builder = new IntentHandlerBuilder(intentName))
        describe('canHandle', () => {
            it('should return false if another request type provided', () => {
                const request: LaunchRequest = {
                    type: 'LaunchRequest',
                    requestId: 'aaa',
                    timestamp: 'bbb'
                }
                expect(builder.getHandler().canHandle({
                    requestEnvelope: {
                        request
                    }
                } as HandlerInput))
                    .toEqual(false)
            })
            it('should return true if match intent name provided', () => {
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
                expect(builder.getHandler().canHandle({
                    requestEnvelope: {
                        request
                    }
                } as HandlerInput))
                    .toEqual(true)
            })

            it('should return false if un-match intent name provided', () => {
                const request: IntentRequest = {
                    type: 'IntentRequest',
                    requestId: 'aaa',
                    timestamp: 'bbb',
                    dialogState: 'STARTED',
                    intent: {
                        name: 'AnotherIntent',
                        confirmationStatus: 'CONFIRMED'
                    }
                }
                expect(builder.getHandler().canHandle({
                    requestEnvelope: {
                        request
                    }
                } as HandlerInput))
                    .toEqual(false)
            })
        })
        describe('handle', () => {
            it('should throw error if no handle added', () => {
                expect(() => builder.getHandler().handle({} as HandlerInput))
                    .toThrow()
            })
        })
    })
})
