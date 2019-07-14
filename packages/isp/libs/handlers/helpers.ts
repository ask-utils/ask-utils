import {
    StateManager,
    getSlotValue,
    getSessionAttribute
} from '@ask-utils/core'
import { AttributesManager, HandlerInput } from 'ask-sdk'
import {
    ISPProductClient
} from '../client'

export type ISPState = 'BUY' | 'CANCEL' | 'PRODUCT_DETAIL' | ''

export const getISPCurrentState = (attributesManager: AttributesManager): ISPState => {
    return StateManager.getCurrentState<ISPState>(attributesManager)
}
export const updateISPState = (attributesManager: AttributesManager, state: ISPState) => {
    return StateManager.updateState<ISPState>(attributesManager, state)
}
export const resetState = (attributesManager: AttributesManager) => {
    return StateManager.resetState(attributesManager)
}
export const isMatchedISPState = (attributesManager: AttributesManager, state: ISPState) => {
    return state === getISPCurrentState(attributesManager)
}
export const getProductNameFromSlot = (handlerInput: HandlerInput): string | null => {
    const productName = getSlotValue(handlerInput, 'product')
    return productName
}
export const getUserInputProductNo = (handlerInput: HandlerInput): number | null => {
    const slotValue = getSlotValue(handlerInput, 'productNo')
    if (!slotValue) return null
    const productNo = Number(slotValue) - 1
    if (productNo < 0) return null
    return productNo
}

export const getProduct = async (handlerInput: HandlerInput) => {
    const productName = getProductNameFromSlot(handlerInput)
    const productNo = getUserInputProductNo(handlerInput)
    console.log('Requested product %j', { productName, productNo })
    // Slotに値がない
    if (!productName && !productNo) {
        const sessionProduct = getSessionAttribute(handlerInput, 'product')
        return sessionProduct || null
    }
    const client = new ISPProductClient(handlerInput, true)
    await client.fetchLists()
    const product = await client.searchProduct({
        productName: productName || undefined,
        userInputNo: productNo || undefined
    })
    return product
}
