/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    CustomSkillFactory
} from 'ask-sdk-core'
import {
    createIntentRequestHandlerInput,
    RequestEnvelopeFactory,
    HandlerInputFactory,
    IntentRequestFactory
} from '@ask-utils/test'
import {
    RequestHandlerFactory
} from '../../../libs/requestHandlers'

describe('requestHandler', () => {
    describe('RequestHandlerFactory.create', () => {
        it('should return false when create LaucnRequest and give another request', async () => {
            const requestHandler = RequestHandlerFactory.create({
                requestType: 'LaunchRequest',
                handler: (input) => input.responseBuilder.getResponse()
            })
            const handlerInput = createIntentRequestHandlerInput({
                name: 'HelloIntent',
                confirmationStatus: 'NONE'
            })
            expect(await requestHandler.canHandle(handlerInput)).toEqual(false)
        })
        it('should return true when give matcher request', async () => {
            const requestHandler = RequestHandlerFactory.create({
                requestType: 'IntentRequest',
                intentName: 'HelloIntent',
                handler: (input) => input.responseBuilder.getResponse()
            })
            const handlerInput = createIntentRequestHandlerInput({
                name: 'HelloIntent',
                confirmationStatus: 'NONE'
            })
            expect(await requestHandler.canHandle(handlerInput)).toEqual(true)
        })
        it('should return false when give matcher request but return false custom matcher', async () => {
            const requestHandler = RequestHandlerFactory.create({
                requestType: 'IntentRequest',
                intentName: 'HelloIntent',
                situation: {
                    custom: () => false
                },
                handler: (input) => input.responseBuilder.getResponse()
            })
            const handlerInput = createIntentRequestHandlerInput({
                name: 'HelloIntent',
                confirmationStatus: 'NONE'
            })
            expect(await requestHandler.canHandle(handlerInput)).toEqual(false)
        })
        it('should return true when match state', async () => {
            type State = 'start' | 'step1' | 'help'
            const requestHandler = RequestHandlerFactory.create<State>({
                requestType: 'IntentRequest',
                intentName: 'HelloIntent',
                situation: {
                    state: {
                        current: 'help'
                    }
                },
                handler: (input) => {
                    return input.responseBuilder.getResponse()
                }
            })
            const requestEnvelopeFactory = new RequestEnvelopeFactory(
                (new IntentRequestFactory())
                    .setIntent({
                        name: 'HelloIntent',
                        confirmationStatus: 'NONE'
                    })
            )
            requestEnvelopeFactory.session.putAttributes({
                __state: {
                    current: 'init'
                }
            })
            const handlerInputFactory = new HandlerInputFactory(
                requestEnvelopeFactory
            ).updateRequest(requestEnvelopeFactory.getRequest())

            const handlerInput = handlerInputFactory.create()

            expect(await requestHandler.canHandle(handlerInput)).toEqual(false)
        })

        it('should return true when match state', async () => {
            type State = 'start' | 'step1' | 'help'
            const requestHandler = RequestHandlerFactory.create<State>({
                requestType: 'IntentRequest',
                intentName: 'HelloIntent',
                situation: {
                    state: {
                        current: 'help'
                    }
                },
                handler: (input) => {
                    return input.responseBuilder.getResponse()
                }
            })
            const requestEnvelopeFactory = new RequestEnvelopeFactory(
                (new IntentRequestFactory())
                    .setIntent({
                        name: 'HelloIntent',
                        confirmationStatus: 'NONE'
                    })
            )
            requestEnvelopeFactory.session.putAttributes({
                __state: {
                    current: 'help'
                }
            })
            const handlerInputFactory = new HandlerInputFactory(
                requestEnvelopeFactory
            ).updateRequest(requestEnvelopeFactory.getRequest())

            const handlerInput = handlerInputFactory.create()

            expect(await requestHandler.canHandle(handlerInput)).toEqual(true)
        })

        it('should execute the handler and auto update the next request state', async () => {
            type State = 'start' | 'step1' | 'help'
            const skill = CustomSkillFactory.init().addRequestHandlers(
                RequestHandlerFactory.create<State>({
                    requestType: 'IntentRequest',
                    intentName: 'HelloIntent',
                    situation: {
                        state: {
                            current: 'help',
                            next: 'step1'
                        }
                    },
                    handler: (input) => {
                        return input.responseBuilder.getResponse()
                    }
                })
            )
            const requestEnvelopeFactory = new RequestEnvelopeFactory(
                (new IntentRequestFactory())
                    .setIntent({
                        name: 'HelloIntent',
                        confirmationStatus: 'NONE'
                    })
            )
            requestEnvelopeFactory.session.putAttributes({
                __state: {
                    current: 'help'
                }
            })
            skill.create()
            const result = await skill.create().invoke(requestEnvelopeFactory.getRequest())
            expect(result.sessionAttributes).toMatchObject({
                __state: {
                    before: ['help'],
                    current: 'step1'
                }
            })
        })

        it('should execute the handler and update manually', async () => {
            type State = 'start' | 'step1' | 'help'
            const skill = CustomSkillFactory.init().addRequestHandlers(
                RequestHandlerFactory.create<State>({
                    requestType: 'IntentRequest',
                    intentName: 'HelloIntent',
                    situation: {
                        state: {
                            current: 'help',
                            next: 'step1'
                        }
                    },
                    handler: (input, { stateManager }) => {
                        stateManager.setState('step1', ['help'])
                        return input.responseBuilder.getResponse()
                    }
                })
            )
            const requestEnvelopeFactory = new RequestEnvelopeFactory(
                (new IntentRequestFactory())
                    .setIntent({
                        name: 'HelloIntent',
                        confirmationStatus: 'NONE'
                    })
            )
            requestEnvelopeFactory.session.putAttributes({
                __state: {
                    current: 'help'
                }
            })
            skill.create()
            const result = await skill.create().invoke(requestEnvelopeFactory.getRequest())
            expect(result.sessionAttributes).toMatchObject({
                __state: {
                    current: 'step1',
                    next: ['help']
                }
            })
        })
    })
})
