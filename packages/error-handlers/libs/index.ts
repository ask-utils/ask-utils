import { ErrorHandler, RequestInterceptor, HandlerInput } from 'ask-sdk-core'
import { Response } from 'ask-sdk-model'
import * as Sentry from '@sentry/node'
Sentry.init({ dsn: process.env.SENTRY_DNS as string })

export type ErrorHandle = (handlerInput: HandlerInput, error: Error) => Promise<Response> | Response
export interface ErrorHandlerBuilder {
    getHandler(): ErrorHandler;
    setHandle(handle: ErrorHandle): ErrorHandlerBuilder;
    setErrorResponse(speechText: string, repromptText: string): ErrorHandlerBuilder;
}
/**
 * ErrorHandler Factory for Sentry
 *
 * @example Basic
 * ```typescript
 * const ErrorHandler = SentryErrorHandlerFactory.init().getHandler()
 * ```
 * @example Custom speech and reprompt
 * ```typescript
 * const ErrorHandler = SentryErrorHandlerFactory.init()
 *                          .setErrorResponse('Speech something', 'reprompt something')
 *                          .getHandler()
 * ```
 * @example Custom handler
 * ```typescript
 * const ErrorHandler = SentryErrorHandlerFactory.init()
 *                          .setHandle((handlerInput) => {
*                             return handlerInput.responseBuilder
 *                              .speak('Sorry I could not understand the meaning. Please tell me again')
 *                              .reprompt('Could you tell me onece more?')
 *                              .getResponse()
 *                          })
 *                          .getHandler()
 * ```
 */
export class SentryErrorHandlerFactory {
    public static init (): ErrorHandlerBuilder {
        let handlerFilter: ErrorHandle = (handlerInput) => {
            return handlerInput.responseBuilder
                .speak('Sorry I could not understand the meaning. Please tell me again')
                .reprompt('Could you tell me onece more?')
                .getResponse()
        }

        const handler: ErrorHandler = {
            canHandle: () => true,
            handle: (handlerInput, error) => {
                Sentry.captureEvent({
                    message: error.message,
                    extra: {
                        request: handlerInput.requestEnvelope,
                        error,
                        stack: error.stack
                    }
                })
                return handlerFilter(handlerInput, error)
            }
        }
        return {
            getHandler (): ErrorHandler {
                return handler
            },
            setHandle (handle: ErrorHandle) {
                handlerFilter = handle
                return this
            },
            setErrorResponse (speechText: string, repromptText: string) {
                handlerFilter = (handlerInput) => {
                    return handlerInput.responseBuilder
                        .speak(speechText)
                        .reprompt(repromptText)
                        .getResponse()
                }
                return this
            }
        }
    }
}

export const SentryDefaultErrorHandler: ErrorHandler = SentryErrorHandlerFactory.init().getHandler()

/**
 * Set additional track information
 *
 * @example
 * import Alexa from 'ask-sdk'
 * import { SetErrorTrackerInterceptor, SentryDefaultErrorHandler } from '@ask-utils/error-handlers'
 *
 * export const handler = Alexa.SkillBuilders.standard()
 *                            .addErrorHandlers(SentryDefaultErrorHandler)
 *                            .addRequestInterceptors(SetErrorTrackerInterceptor)
 *                            .lambda()
 */
export const SetErrorTrackerInterceptor: RequestInterceptor = {
    process ({ requestEnvelope }) {
        const { System } = requestEnvelope.context
        const userParams: {[key: string]: string} = {
            userId: System.user.userId
        }
        if (System.device) userParams.deviceId = System.device.deviceId
        if (requestEnvelope.session) userParams.sessionId = requestEnvelope.session.sessionId

        Sentry.configureScope(scope => {
            scope.setTag('request_id', requestEnvelope.request.requestId)
            scope.setUser(userParams)
        })
    }
}
