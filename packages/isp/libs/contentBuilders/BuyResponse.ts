import ContentBuilder, {
    ResponseContent
} from './base'

export class BuyResponseContentBuilder extends ContentBuilder {
    // purchaseResult === 'DECLINED'
    private getDeclinedPurchaseResult (): ResponseContent {
        const product = this.getProduct()
        if (this.isJP()) {
            return {
                speechText: [
                    `${product && product.name ? product.name : '商品'}に興味を持ってくれてありがとうございます。`,
                    'また機会が購入してくださいね。',
                    '次はなにをしますか？'
                ].join(' '),
                repromptText: '次はなにをしますか？'
            }
        }
        return {
            speechText: [
                `Thanks for your interest in the ${product && product.name ? product.name : 'product'}.`,
                'What will you do for next?'
            ].join(' '),
            repromptText: 'What will you do for next?'
        }
    }
    public setDeclinedPurchaseResult (): this {
        this.contents = this.getDeclinedPurchaseResult()
        return this
    }
    // purchaseResult === 'ACCEPTED'
    private getAcceptedPurchaseResult (): ResponseContent {
        const product = this.getProduct()
        if (this.isJP()) {
            return {
                speechText: [
                    `${product && product.name ? product.name : '商品'}の購入ありがとうございます。`,
                    '次は何をしますか？'
                ].join(' '),
                repromptText: '次は何をしますか？'
            }
        }
        return {
            speechText: [
                `You have purchased the ${product && product.name ? product.name : 'product'}.`,
                'What will you do for next?'
            ].join(' '),
            repromptText: 'What will you do for next?'
        }
    }
    public setAcceptedPurchaseResult (): this {
        this.contents = this.getAcceptedPurchaseResult()
        return this
    }
    private getFailedPurchaseResult (): ResponseContent {
        if (this.isJP()) {
            return {
                speechText: [
                    'スキル商品の購入処理に失敗しました。',
                    'もう一度トライするか、アレクサアプリからサポートに問い合わせてください。'
                ].join(' ')
            }
        }
        return {
            speechText: [
                'There was an error handling your purchase request.',
                'Please try again or contact us for help.'
            ].join(' ')
        }
    }
    public setFailedPurchaseResult (): this {
        this.contents = this.getFailedPurchaseResult()
        return this
    }
}
