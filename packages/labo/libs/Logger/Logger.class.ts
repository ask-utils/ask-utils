import { Logger as TsLogger, ISettingsParam } from 'tslog'
import { RequestEnvelope } from 'ask-sdk-model'
import { isInAWSLambda, AWSLambdaEnvContext } from './Logger.utils'

/**
 * Logger service for ASK SDK
 */
export class LoggerService {
    private static _instance: LoggerService
    private readonly _logger: TsLogger;

    public constructor (requestEnvelope: RequestEnvelope, loggerConfig?: ISettingsParam) {
        this._logger = new TsLogger({
            type: isInAWSLambda() ? 'json' : 'pretty',
            ...loggerConfig,
            displayInstanceName: true,
            displayLoggerName: isInAWSLambda(),
            displayRequestId: true,
            displayTypes: true,
            name: isInAWSLambda() ? `${AWSLambdaEnvContext.functionName}-${AWSLambdaEnvContext.functionVersion}` : '',
            instanceName: requestEnvelope.request.type,
            requestId: requestEnvelope.request.requestId
        })
    }

    public static getInstance (requestEnvelope?: RequestEnvelope, loggerConfig?: ISettingsParam): LoggerService {
        if (!this._instance) {
            if (!requestEnvelope) {
                throw new Error('requestEnvelope is required for initializing')
            }
            this._instance = new LoggerService(requestEnvelope, loggerConfig)
        }
        return this._instance
    }

    public get logger (): TsLogger {
        return this._logger
    }
}
