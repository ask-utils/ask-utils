/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    CustomSkillFactory
} from 'ask-sdk-core'
import {
    createIntentRequestHandlerInput,
    RequestEnvelopeFactory,
    HandlerInputFactory,
    IntentRequestFactory,
    LaunchRequestFactory
} from '@ask-utils/test'
import {
    RequestHandlerFactory
} from '../../../libs/requestHandlers'

describe('requestHandler', () => {
    describe('RequestHandlerFactory', () => {
        describe('canHandle', () => {
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
            it('should return false when given route includes matched intent name in Array', async () => {
                const requestHandler = RequestHandlerFactory.create({
                    requestType: 'IntentRequest',
                    intentName: ['AMAZON.StopIntent', 'AMAZON.CancelIntent'],
                    handler: (input) => input.responseBuilder.getResponse()
                })
                const handlerInput = createIntentRequestHandlerInput({
                    name: 'AMAZON.StopIntent',
                    confirmationStatus: 'NONE'
                })
                expect(await requestHandler.canHandle(handlerInput)).toEqual(true)
                const handlerInput2 = createIntentRequestHandlerInput({
                    name: 'AMAZON.CancelIntent',
                    confirmationStatus: 'NONE'
                })
                expect(await requestHandler.canHandle(handlerInput2)).toEqual(true)
            })
            it('should return false when given unmatched intent name Array', async () => {
                const requestHandler = RequestHandlerFactory.create({
                    requestType: 'IntentRequest',
                    intentName: ['AMAZON.StopIntent', 'AMAZON.CancelIntent'],
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
        })
        describe('handle', () => {
            it('should auto set shouldEndSession props', async () => {
                type State = 'start' | 'step1' | 'help'
                const requestHandler = RequestHandlerFactory.create<State>({
                    requestType: 'IntentRequest',
                    intentName: 'HelloIntent',
                    situation: {
                        shouldEndSession: true
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
                const handlerInputFactory = new HandlerInputFactory(
                    requestEnvelopeFactory
                ).updateRequest(requestEnvelopeFactory.getRequest())

                const handlerInput = handlerInputFactory.create()

                expect(await requestHandler.handle(handlerInput)).toEqual({
                    shouldEndSession: true
                })
            })
        })
        describe('e2e', () => {
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
            describe('should execute conversations', () => {
                type State = 'start' | 'step1' | 'step2' | 'end' | 'help'
                const testTargetConversations = new RequestHandlerFactory<State>()
                testTargetConversations.addRoutes({
                    requestType: 'LaunchRequest',
                    handler: (input) => {
                        return input.responseBuilder
                            .speak('hello world').getResponse()
                    }
                }, {
                    requestType: 'IntentRequest',
                    intentName: 'HelloIntent',
                    handler: (input, helpers) => {
                        helpers.stateManager.setState('step1')
                        return input.responseBuilder
                            .speak('Go to step 1').reprompt('will you go?').getResponse()
                    }
                }, {
                    requestType: 'IntentRequest',
                    intentName: 'Step1Intent',
                    situation: {
                        state: {
                            current: 'step1',
                            next: 'step2'
                        }
                    },
                    handler: (input) => {
                        return input.responseBuilder
                            .speak('Go to step 2').reprompt('will you go?').getResponse()
                    }
                }, {
                    requestType: 'IntentRequest',
                    intentName: 'Step2Intent',
                    situation: {
                        state: {
                            current: 'step2',
                            next: 'end'
                        }
                    },
                    handler: (input) => {
                        return input.responseBuilder
                            .speak('Finnaly').reprompt('will you go?').getResponse()
                    }
                }, {
                    requestType: 'IntentRequest',
                    intentName: 'AMAZON.YesIntent',
                    situation: {
                        shouldEndSession: true,
                        state: {
                            current: 'end'
                        }
                    },
                    handler: (input) => {
                        return input.responseBuilder
                            .speak('Bye!').getResponse()
                    }
                }, {
                    requestType: 'IntentRequest',
                    intentName: 'AMAZON.StopIntent',
                    situation: {
                        shouldEndSession: true
                    },
                    handler: (input) => {
                        return input.responseBuilder
                            .speak('Bye!').getResponse()
                    }
                })
                const handler = CustomSkillFactory.init()
                    .addRequestHandlers(
                        ...testTargetConversations.createHandlers()
                    ).create()
                it('[1st] should return welcome prompt when given LaunchRequest', async () => {
                    const requestEnvelopeFactory = new RequestEnvelopeFactory(
                        new LaunchRequestFactory()
                    )
                    expect(await handler.invoke(requestEnvelopeFactory.getRequest())).toMatchObject({
                        response: {
                            outputSpeech: {
                                ssml: '<speak>hello world</speak>',
                                type: 'SSML'
                            }
                        },
                        sessionAttributes: {
                            __state: {
                                current: '',
                                next: []
                            }
                        }
                    })
                })
                it('[2nd] should return welcome prompt when given LaunchRequest', async () => {
                    const requestEnvelopeFactory = new RequestEnvelopeFactory(
                        (new IntentRequestFactory())
                            .setIntent({
                                name: 'HelloIntent',
                                confirmationStatus: 'NONE'
                            })
                    )
                    expect(await handler.invoke(requestEnvelopeFactory.getRequest())).toMatchObject({
                        response: {
                            outputSpeech: {
                                ssml: '<speak>Go to step 1</speak>',
                                type: 'SSML'
                            }
                        },
                        sessionAttributes: {
                            __state: {
                                current: 'step1'
                            }
                        }
                    })
                })
                it('[3rd] should return valid response when call step1Intent after called HelloIntent', async () => {
                    const helloResponse = await handler.invoke(new RequestEnvelopeFactory(
                        (new IntentRequestFactory())
                            .setIntent({
                                name: 'HelloIntent',
                                confirmationStatus: 'NONE'
                            })
                    ).getRequest())
                    const requestEnvelopeFactory = new RequestEnvelopeFactory(
                        (new IntentRequestFactory())
                            .setIntent({
                                name: 'Step1Intent',
                                confirmationStatus: 'NONE'
                            })
                    )
                    requestEnvelopeFactory.session.putAttributes({
                        ...helloResponse.sessionAttributes
                    })
                    expect(await handler.invoke(requestEnvelopeFactory.getRequest())).toMatchObject({
                        response: {
                            outputSpeech: {
                                ssml: '<speak>Go to step 2</speak>',
                                type: 'SSML'
                            }
                        },
                        sessionAttributes: {
                            __state: {
                                before: ['step1'],
                                current: 'step2'
                            }
                        }
                    })
                })

                it('[3rd-b] should return request when call directory (without state)', async () => {
                    const requestEnvelopeFactory = new RequestEnvelopeFactory(
                        (new IntentRequestFactory())
                            .setIntent({
                                name: 'Step1Intent',
                                confirmationStatus: 'NONE'
                            })
                    )
                    expect(await handler.invoke(requestEnvelopeFactory.getRequest())).toMatchObject({
                        response: {
                            outputSpeech: {
                                ssml: '<speak>Go to step 2</speak>',
                                type: 'SSML'
                            }
                        },
                        sessionAttributes: {
                            __state: {
                                before: ['step1'],
                                current: 'step2'
                            }
                        }
                    })
                })

                it('[3rd-c] should reject request with invalid state', async () => {
                    const requestEnvelopeFactory = new RequestEnvelopeFactory(
                        (new IntentRequestFactory())
                            .setIntent({
                                name: 'Step1Intent',
                                confirmationStatus: 'NONE'
                            })
                    )
                    requestEnvelopeFactory.session.putAttributes({
                        __state: {
                            current: 'invalid'
                        }
                    })
                    await expect(handler.invoke(requestEnvelopeFactory.getRequest())).rejects.toThrowError(
                        'Unable to find a suitable request handler.'
                    )
                })
                it('[4th] should return valid response when call step1Intent after called HelloIntent', async () => {
                    const helloResponse = await handler.invoke(new RequestEnvelopeFactory(
                        (new IntentRequestFactory())
                            .setIntent({
                                name: 'HelloIntent',
                                confirmationStatus: 'NONE'
                            })
                    ).getRequest())
                    const step1Request = new RequestEnvelopeFactory(
                        (new IntentRequestFactory())
                            .setIntent({
                                name: 'Step1Intent',
                                confirmationStatus: 'NONE'
                            })
                    )
                    step1Request.session.putAttributes({
                        ...helloResponse.sessionAttributes
                    })
                    const step1Response = await handler.invoke(step1Request.getRequest())
                    const step2Request = new RequestEnvelopeFactory(
                        (new IntentRequestFactory())
                            .setIntent({
                                name: 'Step2Intent',
                                confirmationStatus: 'NONE'
                            })
                    )
                    step2Request.session.putAttributes({
                        ...step1Response.sessionAttributes
                    })
                    const step2Response = await handler.invoke(step2Request.getRequest())

                    const requestEnvelopeFactory = new RequestEnvelopeFactory(
                        (new IntentRequestFactory())
                            .setIntent({
                                name: 'AMAZON.YesIntent',
                                confirmationStatus: 'NONE'
                            })
                    )
                    requestEnvelopeFactory.session.putAttributes({
                        ...step2Response.sessionAttributes
                    })

                    expect(await handler.invoke(requestEnvelopeFactory.getRequest())).toMatchObject({
                        response: {
                            outputSpeech: {
                                ssml: '<speak>Bye!</speak>',
                                type: 'SSML'
                            }
                        },
                        sessionAttributes: {
                            __state: {
                                before: ['step2'],
                                current: 'end'
                            }
                        }
                    })
                })
            })
        })
    })
})
