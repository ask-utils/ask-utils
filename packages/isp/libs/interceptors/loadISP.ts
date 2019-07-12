import { HandlerInput, getLocale, isNewSession } from 'ask-sdk-core'
/**
 * Load In Skill Product interceptor
 * @external https://developer.amazon.com/ja/blogs/alexa/post/75ee61df-8365-44bb-b28f-e708000891ad/how-to-use-interceptors-to-simplify-handler-code-and-cache-product-and-purchase-information-in-monetized-alexa-skills
 * @example
 * ```typescript
 * // set it into the request interceptor
 * .addRequestInteceptor(loadISPDataInterceptor)
 *
 * // get product from session attributes
 * import { getAllEntitledProducts } from '@ask-utils/isp'
 *
 * const { inSkillProducts } = handlerInput.attributesManager.getSessionAttributes()
 * const entitledProducts = getAllEntitledProducts(inSkillProducts)
 * ```
 */
export const loadISPDataInterceptor = {
    async process ({ requestEnvelope, serviceClientFactory, attributesManager }: HandlerInput): Promise<void> {
        if (!requestEnvelope.session || !isNewSession(requestEnvelope)) return
        if (!serviceClientFactory) return
        // new session, check to see what products are already owned.
        try {
            const locale = getLocale(requestEnvelope)
            const ms = serviceClientFactory.getMonetizationServiceClient()
            const result = await ms.getInSkillProducts(locale)
            const sessionAttributes = attributesManager.getSessionAttributes()
            sessionAttributes.inSkillProducts = result.inSkillProducts
            attributesManager.setSessionAttributes(sessionAttributes)
        } catch (error) {
            console.log(`Error calling InSkillProducts API: ${error}`)
        }
    }
}
