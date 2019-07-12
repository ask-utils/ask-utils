import { interfaces } from 'ask-sdk-model'
import connections = interfaces.connections
import SendRequestDirective = connections.SendRequestDirective
/**
 * Create random string to create a request token
 */
export const createRandomToken = (): string => Math.random().toString(36).slice(-8)

/**
 * Get directive object to sent Buy request
 * @param productId string - ISP product id
 * @param token [string] - request token
 */
export const getBuyProductDirective = (productId: string, token: string = createRandomToken()): SendRequestDirective => {
    return {
        type: 'Connections.SendRequest',
        name: 'Buy',
        payload: {
            InSkillProduct: {
                productId
            }
        },
        token
    }
}

export const getCancelProductDirective = (productId: string, token: string = createRandomToken()): SendRequestDirective => {
    return {
        type: 'Connections.SendRequest',
        name: 'Cancel',
        payload: {
            InSkillProduct: {
                productId
            }
        },
        token
    }
}
