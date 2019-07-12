import { services } from 'ask-sdk-model'
import monetization = services.monetization
import InSkillProduct = monetization.InSkillProduct
type InskillProducts = InSkillProduct[]

/**
 * Get purchaseable products
 * @param inSkillProductList {services.monetization.InSkillProduct[]}
 */
export const getAllPurchasableProducts = (inSkillProductList: InskillProducts): InskillProducts => {
    return inSkillProductList.filter((record): boolean => {
        if (record.entitled === 'ENTITLED') return false
        return record.purchasable === 'PURCHASABLE'
    })
}

/**
 * search by entitled state
 * @param inSkillProductList {services.monetization.InSkillProduct[]}
 * @param status {services.monetization.EntitledState}
 */
export const searchProductByEntitledStatus = (inSkillProductList: InskillProducts, status: monetization.EntitledState): InskillProducts => {
    return inSkillProductList.filter((record): boolean => record.entitled === status)
}

/**
 * Get entitled products
 * @param inSkillProductList {services.monetization.InSkillProduct[]}
 */
export const getAllEntitledProducts = (inSkillProductList: InskillProducts): InskillProducts => {
    const product = searchProductByEntitledStatus(inSkillProductList, 'ENTITLED')
    console.log('Currently entitled products: %j', product)
    return product
}

/**
 * Get product by the product name
 * @param inSkillProductList {services.monetization.InSkillProduct[]}
 * @param name {string}
 */
export const getProductByName = <T extends string>(inSkillProductList: InskillProducts, name: T): InSkillProduct | null => {
    if (inSkillProductList.length < 1) return null
    const product = inSkillProductList.find((product): boolean => product.name === name)
    if (!product) return null
    return product
}
