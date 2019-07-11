import { HandlerInput } from 'ask-sdk-core'
import { RequestInterceptor } from 'ask-sdk-runtime'

export interface SkillConstants {
    [key: string]: unknown;
}
export class ConstantsInterceptorFactory {
    public static init<T extends SkillConstants = SkillConstants> (constants: T): RequestInterceptor<HandlerInput> {
        return {
            async process ({ attributesManager }: HandlerInput) {
                const atts = attributesManager.getRequestAttributes()
                attributesManager.setRequestAttributes({
                    ...atts,
                    CONSTANTS: constants
                })
            }
        }
    }
}

export default ConstantsInterceptorFactory
