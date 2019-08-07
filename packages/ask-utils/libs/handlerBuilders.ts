import {
    RequestInterceptor,
    ResponseInterceptor,
    ErrorHandler,
    RequestHandler
} from 'ask-sdk'
import {
    SkillHandlers
} from './models'

export interface SkillHandlersBuilder {
    addRequestHandlers(...requestHandlers: RequestHandler[]): SkillHandlersBuilder;
    addRequestInterceptors(...requestInterceptors: RequestInterceptor[]): SkillHandlersBuilder;
    addResponseInterceptors(...responseInterceptors: ResponseInterceptor[]): SkillHandlersBuilder;
    addErrorHandlers(...errorHandlers: ErrorHandler[]): SkillHandlersBuilder;
    getHandlers(): SkillHandlers;
}
export class SkillHandlersFactory {
    public static create (): SkillHandlersBuilder {
        const handlers: Required<SkillHandlers> = {
            requestHandlers: [],
            requestInterceptors: [],
            responseInterceptors: [],
            errorHandlers: []
        }
        return {
            addRequestHandlers (...requestHandlers: RequestHandler[]): SkillHandlersBuilder {
                console.log(requestHandlers)
                requestHandlers.forEach(handler => handlers.requestHandlers.push(handler))
                return this
            },
            addRequestInterceptors (...requestInterceptors: RequestInterceptor[]): SkillHandlersBuilder {
                if (!handlers.requestInterceptors) handlers.requestInterceptors = []
                requestInterceptors.forEach(interceptor => handlers.requestInterceptors.push(interceptor))
                return this
            },
            addResponseInterceptors (...responseInterceptors: ResponseInterceptor[]): SkillHandlersBuilder {
                if (!handlers.responseInterceptors) handlers.responseInterceptors = []
                responseInterceptors.forEach(interceptor => handlers.responseInterceptors.push(interceptor))
                return this
            },
            addErrorHandlers (...errorHandlers: ErrorHandler[]): SkillHandlersBuilder {
                if (!handlers.errorHandlers) handlers.errorHandlers = []
                handlers.errorHandlers.concat(errorHandlers)
                return this
            },
            getHandlers (): SkillHandlers {
                return handlers
            }
        }
    }
}
