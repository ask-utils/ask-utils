import { ResponseFactory } from 'ask-sdk-core'
import { Directive } from 'ask-sdk-model'
import {
    ContentBuilder
} from '../../libs/index'

describe('libs.ContentBuilder.ts', () => {
    describe('class.ContentBuilder', () => {
        let builder = new ContentBuilder('en', ResponseFactory.init())
        // eslint-disable-next-line no-return-assign
        beforeEach(() => builder = new ContentBuilder('en', ResponseFactory.init()))
        describe('putSpeechText()', () => {
            it('should return speech response', () => {
                builder.putSpeechText('hello')
                expect(builder.getResponse()).toEqual({
                    outputSpeech: {
                        ssml: '<speak>hello</speak>',
                        type: 'SSML'
                    }
                })
            })
        })
        describe('putRepromptText()', () => {
            it('should return speech and reprompt response', () => {
                builder.putSpeechText('hello').putRepromptText('next?')
                expect(builder.getResponse()).toEqual({
                    outputSpeech: {
                        ssml: '<speak>hello</speak>',
                        type: 'SSML'
                    },
                    reprompt: {
                        outputSpeech: {
                            ssml: '<speak>next?</speak>',
                            type: 'SSML'
                        }
                    },
                    shouldEndSession: false
                })
            })
        })
        describe('putDirective()', () => {
            it('should return response with directive', () => {
                const directive: Directive = {
                    type: 'Connections.SendRequest',
                    name: 'directivename',
                    payload: {
                        key: 'value'
                    },
                    token: 'token string'
                }
                builder.putDirective(directive)
                expect(builder.getResponse()).toEqual({
                    directives: [directive]
                })
            })
            it('should return response with directive', () => {
                const directive: Directive = {
                    type: 'Connections.SendRequest',
                    name: 'directivename',
                    payload: {
                        key: 'value'
                    },
                    token: 'token string'
                }
                const directive2: Directive = {
                    type: 'Connections.SendRequest',
                    name: 'directivename',
                    payload: {
                        key: 'value'
                    },
                    token: 'token string'
                }
                builder.putDirective(directive).putDirective(directive2)
                expect(builder.getResponse()).toEqual({
                    directives: [directive, directive2]
                })
            })
        })
        describe('putDirectives()', () => {
            it('should return response with multi directives', () => {
                const directives: Directive[] = [{
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    token: 'token string',
                    document: {
                        key: 'value'
                    },
                    datasources: {
                        key: 'value'
                    },
                    packages: [
                        'testpackages'
                    ]
                }, {
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    token: 'token string2',
                    document: {
                        key: 'value2'
                    },
                    datasources: {
                        key: 'value2'
                    },
                    packages: [
                        'testpackages2'
                    ]
                }]
                builder.putDirectives(directives)
                expect(builder.getResponse()).toEqual({
                    directives
                })
            })
            it('should return valid multi directive', () => {
                const directives: Directive[] = [{
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    token: 'token string',
                    document: {
                        key: 'value'
                    },
                    datasources: {
                        key: 'value'
                    },
                    packages: [
                        'testpackages'
                    ]
                }]
                const directive: Directive = {
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    token: 'token string2',
                    document: {
                        key: 'value2'
                    },
                    datasources: {
                        key: 'value2'
                    },
                    packages: [
                        'testpackages2'
                    ]
                }
                builder.putDirective(directive).putDirectives(directives)
                expect(builder.getResponse()).toEqual({
                    directives: [{
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        token: 'token string2',
                        document: {
                            key: 'value2'
                        },
                        datasources: {
                            key: 'value2'
                        },
                        packages: [
                            'testpackages2'
                        ]
                    }, {
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        token: 'token string',
                        document: {
                            key: 'value'
                        },
                        datasources: {
                            key: 'value'
                        },
                        packages: [
                            'testpackages'
                        ]
                    }]
                })
            })
        })
    })
})
