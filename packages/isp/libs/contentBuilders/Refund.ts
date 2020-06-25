import {
    getCancelProductDirective
} from '../index'
import ContentBuilder, {
    ResponseContent
} from './base'
export class RefundContentBuilder extends ContentBuilder {
    /**
   * If product not purchased yet
   */
    public getNoEntitledProductResponse (): ResponseContent {
        const product = this.getProduct()
        if (this.isJP()) {
            return {
                speechText: [
                    `${product.name} は購入していない商品ですので、キャンセルできません。`,
                    '他になにをしますか？'
                ].join(' '),
                repromptText: '他に何をしますか？'
            }
        }
        return {
            speechText: [
                'You can not refund it.',
                `Because the ${product.name} is not purchased.`,
                'What do you want to do next?'
            ].join(' '),
            repromptText: 'What will you do for next?'
        }
    }

    public setNoEntitledProductResponse (): this {
        this.contents = this.getNoEntitledProductResponse()
        return this
    }

    public setCancelDirective (productId: string): this {
        this.contents.directive = getCancelProductDirective(productId)
        return this
    }
}
