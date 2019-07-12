import { ResponseBuilder } from 'ask-sdk-core'
import { Response, Directive } from 'ask-sdk-model'
export interface ResponseContent {
    speechText?: string;
    repromptText?: string;
    directives?: Directive[];
}
export class ContentBuilder {
    protected locale: string
    protected responseBuilder: ResponseBuilder
    protected contents: ResponseContent = {}
    public constructor (locale: string, responseBuilder: ResponseBuilder) {
        this.locale = locale
        this.responseBuilder = responseBuilder
    }
    protected isJP (): boolean {
        return /^jp/.test(this.locale)
    }
    public putSpeechText (text: string): this {
        this.contents.speechText = text
        return this
    }
    public putRepromptText (text: string): this {
        this.contents.repromptText = text
        return this
    }
    public putDirectives (directives: Directive[]): this {
        if (!this.contents.directives) {
            this.contents.directives = directives
            return this
        }
        this.contents.directives = this.contents.directives.concat(directives)
        return this
    }
    public putDirective (directive: Directive): this {
        if (!this.contents.directives) {
            this.contents.directives = [directive]
            return this
        }
        this.contents.directives.push(directive)
        return this
    }
    public getResponse (): Response {
        const { speechText, repromptText, directives } = this.contents
        if (speechText) this.responseBuilder.speak(speechText)
        if (repromptText) this.responseBuilder.reprompt(repromptText)
        if (directives) directives.forEach((directive): ResponseBuilder => this.responseBuilder.addDirective(directive))
        return this.responseBuilder.getResponse()
    }
}
export default ContentBuilder
