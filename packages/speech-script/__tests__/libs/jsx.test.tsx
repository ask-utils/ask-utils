/** @jsx ssml */
import ssml from "ssml-tsx";
import {
    createIntentRequestHandlerInput
} from "@ask-utils/test"
import {
    SpeechScriptJSX
} from '../../libs/jsx'
import { IntentRequest } from "ask-sdk-model";
import { HandlerInput } from "ask-sdk";

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
                        {props.request.intent.name} is called
                    </speak>
                )
            }
        }
        const target = new Demo(handlerInput)
        expect(target.create()).toEqual({
            reprompt: "<speak>HelloIntent is called</speak>",
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
})