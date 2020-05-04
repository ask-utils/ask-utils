import { HandlerInput, getRequest } from 'ask-sdk';
import { Request } from 'ask-sdk-model';
import { AlexaSpeechComponentProps, ProgressiveResponse } from './model';


export abstract class SpeechScriptJSX<T extends Request = Request>  {
    protected readonly props: AlexaSpeechComponentProps<T>
    constructor(handlerInput: HandlerInput) {
        this.props = {
            ...handlerInput,
            ...handlerInput.requestEnvelope,
            request: getRequest<T>(handlerInput.requestEnvelope)
        }
    }
    public progressiveResponse(): JSX.Element | null {
        return null;
    }
    public speech(): JSX.Element | null {
        return null;
    }
    public reprompt(): JSX.Element | null {
        return null;
    }
    private createProgressiveResponse(): ProgressiveResponse | undefined {
        const progressiveRepsonse = this.progressiveResponse()
        if (!progressiveRepsonse) return undefined
        const ssml = progressiveRepsonse.toString()
        return {
            ssml,
            directive: {
                header: {
                    requestId: this.props.request.requestId
                },
                directive: {
                    type: "VoicePlayer.Speak",
                    speech: ssml
                }
            }
        }
    }
    public create() {
        const speech = this.speech()
        const reprompt = this.reprompt()
        return {
            speech: speech ? speech.toString(): undefined,
            reprompt: reprompt ? reprompt.toString(): undefined,
            progressiveRepsonse: this.createProgressiveResponse(),
        }
    }
}

