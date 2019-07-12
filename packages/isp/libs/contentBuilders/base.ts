import { services, Response, Directive } from 'ask-sdk-model'
import { ResponseBuilder } from 'ask-sdk-core'

import InSkillProduct = services.monetization.InSkillProduct

export interface ResponseContent {
    speechText?: string;
    repromptText?: string;
    directive?: Directive;
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
    public getResponse (): Response {
        const { speechText, repromptText, directive } = this.contents
        if (speechText) this.responseBuilder.speak(speechText)
        if (repromptText) this.responseBuilder.reprompt(repromptText)
        if (directive) this.responseBuilder.addDirective(directive)
        return this.responseBuilder.getResponse()
    }
}

export class ISPContentBuilder extends ContentBuilder {
    protected productName?: string
    protected product?: InSkillProduct
    public constructor (locale: string, responseBuilder: ResponseBuilder, productName?: string, product?: InSkillProduct) {
        super(locale, responseBuilder)
        if (productName) this.productName = productName
        if (product) this.product = product
    }
    public setProduct (product: InSkillProduct): this {
        this.product = product
        return this
    }
    protected getProduct (): InSkillProduct {
        const { product } = this
        if (!product) throw new Error('No products')
        return product
    }
    public setProductName (name: string): this {
        this.productName = name
        return this
    }
    protected getProductName (): string {
        if (!this.productName) throw new Error('No product name')
        return this.productName
    }
    /**
   * If the device or account does not supports ISP
   */
    private getUnSupportedISPResponse (): ResponseContent {
        if (this.isJP()) {
            return {
                speechText: [
                    'すみません。',
                    'お使いのデバイス・アプリでは、スキル内課金を利用することができません。',
                    '別のデバイスを利用するか、アレクサアプリから設定を確認してもう一度お試しください。',
                    '次はなにをしますか？',
                    'スキルを終了して、アプリの設定を確認したい場合は「終了」と話しかけてください。'
                ].join(' '),
                repromptText: [
                    '次はなにをしますか？',
                    'スキルを終了して、アプリの設定を確認したい場合は「終了」と話しかけてください。'
                ].join(' ')
            }
        }
        return {
            speechText: [
                'Sorry, you can not purchase by the device.',
                'Please check your device and application settings by the Alexa app.',
                'What will you do the next?'
            ].join(' '),
            repromptText: [
                'What will you do the next?',
                'If you want to stop the skill, please say me "STOP".'
            ].join(' ')
        }
    }
    public setUnSupportedISPResponse (): this {
        this.contents = this.getUnSupportedISPResponse()
        return this
    }
    /**
   * Product does not found response
   */
    private getProductsNotFoundResponse (): ResponseContent {
        if (this.isJP()) {
            return {
                speechText: [
                    `すみません。商品が見つかりませんでした。`,
                    '他に何をしますか？'
                ].join(' '),
                repromptText: '他に何をしますか？'
            }
        }
        return {
            speechText: `I can't find any products you can buy. What do you want to do next?`,
            repromptText: `What do you want to do next?`
        }
    }
    public setProductsNotFoundResponse (): this {
        this.contents = this.getProductsNotFoundResponse()
        return this
    }
    /**
   * Product does not found response
   */
    private getProductNotFoundResponse (): ResponseContent {
        const productName = this.getProductName()
        if (this.isJP()) {
            return {
                speechText: [
                    `${productName}を購入することができます。`,
                    `詳細を聞きたい場合は「${productName}について教えて」、`,
                    `購入する場合は「${productName}を購入」と話しかけてください。`,
                    'どうしますか？'
                ].join(' '),
                repromptText: '購入・詳細、どちらにしますか？'
            }
        }
        return {
            speechText: `${productName}. what item do you want?`,
            repromptText: `${productName}. what item do you want?`
        }
    }
    public setProductNotFoundResponse (): this {
        this.contents = this.getProductNotFoundResponse()
        return this
    }
    /**
   * If product not found
   */
    private getCanNotBuyTheProductResponse (): ResponseContent {
        if (this.isJP()) {
            return {
                speechText: 'すみません。その商品は現在購入できません。他に何をしますか？',
                repromptText: '他に何をしますか？'
            }
        }
        return {
            speechText: "I don't think we have a product by that name.  Can you try again?",
            repromptText: "I didn't catch that. Can you try again?"
        }
    }
    public setCanNotBuyTheProductResponse (): this {
        this.contents = this.getCanNotBuyTheProductResponse()
        return this
    }
    /**
   * If product already purchased
   */
    public getEntitledProductResponse (): ResponseContent {
        if (this.isJP()) {
            return {
                speechText: 'その商品はすでに購入済の様子です。他に何をしますか？',
                repromptText: '他に何をしますか？'
            }
        }
        return {
            speechText: 'You already entitled the product. What will you do for next?',
            repromptText: 'What will you do for next?'
        }
    }
    public setEntitledProductResponse (): this {
        this.contents = this.getEntitledProductResponse()
        return this
    }
}
export default ISPContentBuilder
