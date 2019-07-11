import HandlerBuilder from './Base'
import IntentHandlerBuilder from './Intent'
import LaunchRequestBuilder from './LaunchRequest'
export * from './Base'
export * from './Intent'
export * from './model'

export class IntentHandlerFactory {
    public static init (intentName?: string): IntentHandlerBuilder {
        if (!intentName) throw new Error('intentName is required')
        return new IntentHandlerBuilder(intentName)
    }
}

export class HandlerFactory {
    public static init (type: string, intentName?: string): HandlerBuilder {
        if (type === 'IntentRequest') {
            return IntentHandlerFactory.init(intentName)
        }
        return new HandlerBuilder()
    }
}

export class LaunchRequestFactory {
    public static init (): HandlerBuilder {
        return new LaunchRequestBuilder()
    }
}
