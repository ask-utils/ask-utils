import ContentBuilder, {
    ResponseContent
} from './base'

export class ProductDetailResponseContentBuilder extends ContentBuilder {
    // purchaseResult === 'DECLINED'
    private getProductDetail (): ResponseContent {
        const product = this.getProduct()
        if (this.isJP()) {
            return {
                speechText: [
                    product.summary,
                    '購入しますか？'
                ].join(' '),
                repromptText: '購入しますか？'
            }
        }
        return {
            speechText: [
                product.summary,
                'Will you buy the product?'
            ].join(' '),
            repromptText: 'Will you buy the product?'
        }
    }

    public setProductDetail (): this {
        this.contents = this.getProductDetail()
        return this
    }
}
