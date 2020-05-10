/** @jsx ssml */
import {
    createIntentRequestHandlerInput
} from "@ask-utils/test"
import {
    ssml,
    SpeechScriptJSX
} from '../../libs/index'
import { IntentRequest } from "ask-sdk-model";
import { HandlerInput } from "ask-sdk-core";

describe('SpeechScriptJSX', () => {
    let handlerInput: HandlerInput
    beforeEach(() => {
        handlerInput = createIntentRequestHandlerInput({
            name: 'HelloIntent',
            confirmationStatus: "NONE"
        })
    })
    it('nothing to do by default', () => {
        class Demo extends SpeechScriptJSX {}
        const target = new Demo(handlerInput)
        expect(target.create()).toEqual({})
    })
    it('should return speech text', () => {
        class Demo extends SpeechScriptJSX<IntentRequest> {
            speech(): JSX.Element {
                const props = this.props
                return (
                    <speak>{props.request.intent.name} request</speak>
                )
            }
        }
        const target = new Demo(handlerInput)
        expect(target.create()).toEqual({
            speech: "<speak>HelloIntent request</speak>"
        })
    })
    it('should return speech and reprompt text', () => {
        class Demo extends SpeechScriptJSX<IntentRequest> {
            speech(): JSX.Element {
                const props = this.props
                return (
                    <speak>{props.request.intent.name} request</speak>
                )
            }
            reprompt() {
                const { props } = this;
                return (
                    <speak>
                        <amazon-effect name="whispered">{props.request.intent.name} is called</amazon-effect>
                    </speak>
                )
            }
        }
        const target = new Demo(handlerInput)
        expect(target.create()).toEqual({
            reprompt: "<speak><amazon:effect name=\"whispered\">HelloIntent is called</amazon:effect></speak>",
            speech: "<speak>HelloIntent request</speak>"
        })
    })
    it('should return progressiveResponse text', () => {
        class Demo extends SpeechScriptJSX<IntentRequest> {
            progressiveResponse() {
                const { props } = this
                return (
                    <speak>
                        {props.request.intent.name} progressive response
                    </speak>
                )
            }
        }
        const target = new Demo(handlerInput)
        expect(target.create()).toMatchObject({
            progressiveRepsonse: {
              directive: {
                directive: {
                  speech: "<speak>HelloIntent progressive response</speak>",
                  type: "VoicePlayer.Speak",
                },
                header: {
                  requestId: expect.any(String),
                },
                },
              ssml: "<speak>HelloIntent progressive response</speak>",
            },
        })
    })
    it('should use optional props', () => {
        class Demo extends SpeechScriptJSX<IntentRequest, {name: string}> {
            speech() {
                const name = this.options ? this.options.name : ''
                return (
                    <speak>Hello {name}-san.</speak>
                )
            }
        }
        expect(new Demo(handlerInput, {name: 'john'}).create()).toMatchObject({
            speech: "<speak>Hello john-san.</speak>"
        })
    })
})