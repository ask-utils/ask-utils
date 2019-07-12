import {
    getBuyProductDirective
} from '../index'
import ContentBuilder from './base'
export class BuyContentBuilder extends ContentBuilder {
    public setBuyDirective (productId: string): this {
        this.contents.directive = getBuyProductDirective(productId)
        return this
    }
}
