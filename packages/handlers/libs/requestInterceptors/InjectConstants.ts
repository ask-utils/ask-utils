import { HandlerInput } from 'ask-sdk-core'
import { RequestInterceptor } from 'ask-sdk-runtime'

export interface SkillConstants {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
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
