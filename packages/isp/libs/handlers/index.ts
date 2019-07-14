import { RequestHandler } from 'ask-sdk-core'
import { ProductDetailIntentHandler } from './ProductDetail'
import { ProductListIntentHandler } from './ProductList'
import { BuyIntentHandler } from './Buy'
import { BuyResponseHandler } from './BuyResponse'
import { RefundIntentHandler } from './Refund'
import { RefundResponseHandler } from './RefundResult'
import { UpsellHandler } from './Upsell'

export * from './ProductDetail'
export * from './ProductList'
export * from './Buy'
export * from './BuyResponse'
export * from './Refund'
export * from './RefundResult'
export * from './Upsell'

export const ISPHandlers: RequestHandler[] = [
    ProductDetailIntentHandler,
    ProductListIntentHandler,
    BuyIntentHandler,
    BuyResponseHandler,
    RefundIntentHandler,
    RefundResponseHandler,
    UpsellHandler
]
