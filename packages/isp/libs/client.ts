import axios, { AxiosRequestConfig } from 'axios'
import { getLocale, getApiAccessToken, HandlerInput, AttributesManager } from 'ask-sdk-core'
import { RequestEnvelope, services } from 'ask-sdk-model'
import InSkillProductsResponse = services.monetization.InSkillProductsResponse
import InSkillProduct = services.monetization.InSkillProduct
type InskillProducts = InSkillProduct[]

export class APIClient {
    private token: string
    private locale: string
    private endpoint: string
    private isDebug: boolean
    public constructor (requestEnvelope: RequestEnvelope, isDebug: boolean = true) {
        this.token = getApiAccessToken(requestEnvelope)
        this.locale = getLocale(requestEnvelope)
        this.endpoint = requestEnvelope.context.System.apiEndpoint
        this.isDebug = isDebug
    }
    private getURL (productId?: string): string {
        const url = `${this.endpoint}/v1/users/~current/skills/~current/inSkillProducts`
        if (!productId) return url
        return `${url}/productId`
    }
    private createAxiosRequestObject (productId?: string): AxiosRequestConfig {
        return {
            method: 'GET',
            url: this.getURL(productId),
            headers: {
                'Content-type': 'application/json',
                'Accept-Language': this.locale,
                'Authorization': `Bearer ${this.token}`
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected async get (productId?: string): Promise<any> {
        const param = this.createAxiosRequestObject(productId)
        if (this.isDebug) console.log('[Get ISP product] %j', param)
        const { data } = await axios(param)
        if (this.isDebug) console.log('[Get ISP product] %j', data)
        return data
    }
    public listProducts (): Promise<InSkillProductsResponse> {
        return this.get()
    }
    public getProduct (productId: string): Promise<InSkillProduct> {
        return this.get(productId)
    }
}

export class ISPProductClient extends APIClient {
    private attributeManager: AttributesManager
    private cacheUsage: 'enable' | 'disable' = 'enable'
    private products: InskillProducts = []
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor (handlerInput: HandlerInput, isDebug: boolean = true) {
        super(handlerInput.requestEnvelope, isDebug)
        this.attributeManager = handlerInput.attributesManager
    }
    public getCacheStatus (): 'enable' | 'disable' {
        return this.cacheUsage
    }
    /**
   * Disallow to use the session attributes item at first
   **/
    public disabledCache (): this {
        this.cacheUsage = 'disable'
        return this
    }
    /**
   * Allow to use the session attributes item at first
   **/
    public enableCache (): this {
        this.cacheUsage = 'enable'
        return this
    }
    /**
   * Check product avaliable status
   * If products is empty, try to fetch at once
   */
    private async hasProducts (): Promise<boolean> {
        if (!this.products || this.products.length < 1) await this.fetchLists()
        if (!this.products || this.products.length < 1) return false
        return true
    }
    /**
   * get product from session attributes
   */
    private getCachedProducts (): InskillProducts {
        const { products } = this.attributeManager.getSessionAttributes()
        if (products && products.length > 0) {
            this.products = products
        }
        return this.products
    }
    /**
   * Fetch the ISP API.
   * If cacheUsage is enabled, it will return from session attributes at first
   */
    public async fetchLists (): Promise<void> {
        const atts = this.attributeManager.getSessionAttributes()
        if (this.cacheUsage === 'enable') {
            const cachedProducts = this.getCachedProducts()
            if (cachedProducts && cachedProducts.length > 0) {
                return
            }
        }
        const data = await this.get()
        const products = data.inSkillProducts
        this.products = products
        this.attributeManager.setSessionAttributes({
            ...atts,
            products
        })
    }
    /**
   * get product by product id
   * @param productId {string}
   */
    public async getProductById (productId: string): Promise<InSkillProduct> {
        if (this.cacheUsage === 'enable') {
            const cachedProducts = this.getCachedProducts()
            if (cachedProducts && cachedProducts.length > 0) {
                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                const item = cachedProducts.find(cache => cache.productId === productId)
                if (item) return item
            }
        }
        const product = await this.get(productId)
        return product
    }
    /**
   * get products
   */
    public async getProducts (): Promise<InskillProducts> {
        await this.fetchLists()
        return this.products
    }
    /**
   * Find product by the list number
   * @param userInputNo {number} list number
   */
    public async findProductByNo (userInputNo: number): Promise<InSkillProduct | null> {
        if (!await this.hasProducts()) return null
        const target = this.products[userInputNo]
        return target
    }
    /**
   * Find product by the specific id
   * @param productId {string} product id
   */
    public async findProductById (productId: string): Promise<InSkillProduct | null> {
        if (!await this.hasProducts()) return null
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const product = this.products.find(product => product.productId === productId)
        if (!product) return null
        return product
    }
    /**
   * Find product by the product name
   * @param productName {string} product name
   */
    public async findProductByName (productName: string): Promise<InSkillProduct | null> {
        if (!await this.hasProducts()) return null
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const product = this.products.find(product => product.name === productName)
        if (!product) return null
        return product
    }
    /**
   * Find product by several condition
   * @param condition {productName?: string, userInputNo?: number, productId?: string} search conditions
   */
    public async searchProduct (condition: {productName?: string; userInputNo?: number; productId?: string}): Promise<InSkillProduct | null> {
        if (!condition.productName && !condition.userInputNo && !condition.productId) throw new Error('No search condition')
        if (condition.userInputNo) return this.findProductByNo(condition.userInputNo)
        if (condition.productName) return this.findProductByName(condition.productName)
        if (condition.productId) return this.findProductById(condition.productId)
        throw new Error('Invalid search condition')
    }
}
export default ISPProductClient
