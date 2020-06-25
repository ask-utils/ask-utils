import { services } from 'ask-sdk-model'
import ContentBuilder, {
    ResponseContent
} from './base'
import InSkillProduct = services.monetization.InSkillProduct
export class ProductListResponseContentBuilder extends ContentBuilder {
    private listProducts: InSkillProduct[] = []
    public setProductLists (list: InSkillProduct[]): this {
        this.listProducts = list
        return this
    }

    private getProductLists (): InSkillProduct[] {
        return this.listProducts
    }

    private getListProducts (): ResponseContent {
        const products = this.getProductLists()
        if (products.length === 1) {
            const productText = `<p>${products[0].name}. ${products[0].summary}</p>`
            if (this.isJP()) {
                return {
                    speechText: [
                        productText,
                        '<p>どの商品を購入しますか？</p>'
                    ].join(' '),
                    repromptText: 'どの商品を購入しますか？'
                }
            }
            return {
                speechText: [
                    productText,
                    'What item will you buy?'
                ].join(' '),
                repromptText: 'What item will you buy?'
            }
        }
        if (this.isJP()) {
            return {
                speechText: [
                    products.map((product, i): string => {
                        return `<p>${i + 1}番目。 ${product.name}. ${product.summary}</p>`
                    }).join(''),
                    '<p>どの商品を購入しますか？</p>'
                ].join(' '),
                repromptText: 'どの商品を購入しますか？'
            }
        }
        return {
            speechText: [
                products.map((product, i): string => {
                    return `<p>No.${i + 1}. ${product.name}. ${product.summary}</p>`
                }).join('<p>Next.</p>'),
                'What item will you buy?'
            ].join(' '),
            repromptText: 'What item will you buy?'
        }
    }

    public setListProducts (): this {
        this.contents = this.getListProducts()
        return this
    }
}
