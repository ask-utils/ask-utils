import { services } from 'ask-sdk-model'
import {
    getAllEntitledProducts,
    getAllPurchasableProducts,
    getProductByName
} from '../../libs/productFinders'
import monetization = services.monetization
import InSkillProduct = monetization.InSkillProduct
export type InskillProducts = InSkillProduct[]

describe('libs/directiveBuilders.ts', () => {
    const products: InskillProducts = [
        {
            'productId': 'amzn1.adg.product.xxxxxxxxxxxx',
            'referenceName': 'product_1',
            'type': 'ENTITLEMENT',
            'name': 'product_1',
            'summary': 'summary',
            'entitled': 'NOT_ENTITLED',
            'entitlementReason': 'NOT_PURCHASED',
            'purchasable': 'PURCHASABLE',
            'activeEntitlementCount': 0,
            'purchaseMode': 'TEST'
        },
        {
            'productId': 'amzn1.adg.product.xxxxxxxxxxxx',
            'referenceName': 'product_2',
            'type': 'CONSUMABLE',
            'name': 'product_2',
            'summary': 'summary',
            'entitled': 'ENTITLED',
            'entitlementReason': 'NOT_PURCHASED',
            'purchasable': 'PURCHASABLE',
            'activeEntitlementCount': 0,
            'purchaseMode': 'TEST'
        },
        {
            'productId': 'amzn1.adg.product.xxxxxxxxxxxx',
            'referenceName': 'product_3',
            'type': 'CONSUMABLE',
            'name': 'product_3',
            'summary': 'summary',
            'entitled': 'ENTITLED',
            'entitlementReason': 'NOT_PURCHASED',
            'purchasable': 'NOT_PURCHASABLE',
            'activeEntitlementCount': 0,
            'purchaseMode': 'TEST'
        }
    ]
    describe('getAllEntitledProducts', () => {
        it('should return string', () => {
            expect(getAllEntitledProducts(products)).toEqual([
                {
                    'productId': 'amzn1.adg.product.xxxxxxxxxxxx',
                    'referenceName': 'product_2',
                    'type': 'CONSUMABLE',
                    'name': 'product_2',
                    'summary': 'summary',
                    'entitled': 'ENTITLED',
                    'entitlementReason': 'NOT_PURCHASED',
                    'purchasable': 'PURCHASABLE',
                    'activeEntitlementCount': 0,
                    'purchaseMode': 'TEST'
                },
                {
                    'productId': 'amzn1.adg.product.xxxxxxxxxxxx',
                    'referenceName': 'product_3',
                    'type': 'CONSUMABLE',
                    'name': 'product_3',
                    'summary': 'summary',
                    'entitled': 'ENTITLED',
                    'entitlementReason': 'NOT_PURCHASED',
                    'purchasable': 'NOT_PURCHASABLE',
                    'activeEntitlementCount': 0,
                    'purchaseMode': 'TEST'
                }
            ])
        })
    })
    describe('getAllPurchasableProducts', () => {
        it('should return string', () => {
            expect(getAllPurchasableProducts(products)).toEqual([
                {
                    'productId': 'amzn1.adg.product.xxxxxxxxxxxx',
                    'referenceName': 'product_1',
                    'type': 'ENTITLEMENT',
                    'name': 'product_1',
                    'summary': 'summary',
                    'entitled': 'NOT_ENTITLED',
                    'entitlementReason': 'NOT_PURCHASED',
                    'purchasable': 'PURCHASABLE',
                    'activeEntitlementCount': 0,
                    'purchaseMode': 'TEST'
                }
            ])
        })
    })
    describe('getProductByName', () => {
        it('should return null if invalid product name', () => {
            expect(getProductByName(products, 'product_x')).toEqual(null)
        })
        it('should return product', () => {
            expect(getProductByName(products, 'product_2')).toEqual(
                {
                    'productId': 'amzn1.adg.product.xxxxxxxxxxxx',
                    'referenceName': 'product_2',
                    'type': 'CONSUMABLE',
                    'name': 'product_2',
                    'summary': 'summary',
                    'entitled': 'ENTITLED',
                    'entitlementReason': 'NOT_PURCHASED',
                    'purchasable': 'PURCHASABLE',
                    'activeEntitlementCount': 0,
                    'purchaseMode': 'TEST'
                })
        })
    })
})
