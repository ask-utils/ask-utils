import { Logger as TsLogger, ISettingsParam } from 'tslog'
import each from 'jest-each'
import { RequestEnvelope } from 'ask-sdk-model'
import { RequestEnvelopeFactory, LaunchRequestFactory } from '@ask-utils/test'
import { LoggerService } from '../Logger.class'

const getLogger = (requestEnvelope: RequestEnvelope, conf?: ISettingsParam) => {
    const stdOut: string[] = []
    const stdErr: string[] = []
    const { logger } = new LoggerService(requestEnvelope, {
        type: 'json',
        exposeStack: true,
        stdErr: {
            write: (print: string) => {
                stdErr.push(print)
            }
        },
        stdOut: {
            write: (print: string) => {
                stdOut.push(print)
            }
        },
        ...conf
    })
    return {
        stdOut,
        stdErr,
        logger
    }
}

describe('TsLogger', () => {
    describe('method test', () => {
        let stdOut: string[] = []
        let stdErr: string[] = []
        let logger: TsLogger
        let requestEnvelope: RequestEnvelope = new RequestEnvelopeFactory(new LaunchRequestFactory()).getRequest()
        beforeEach(() => {
            requestEnvelope = new RequestEnvelopeFactory(new LaunchRequestFactory()).getRequest()
            const helper = getLogger(requestEnvelope)
            logger = helper.logger
            stdErr = helper.stdErr
            stdOut = helper.stdOut
        })
        each(['silly', 'info', 'debug', 'trace']).it('Should record the %d log', (type: keyof TsLogger) => {
            (logger as any)[type]('test')
            const logData = JSON.parse(stdOut[0])
            expect(logData.argumentsArray).toEqual(['test'])
            expect(logData.instanceName).toEqual(requestEnvelope.request.type)
            expect(logData.requestId).toEqual(requestEnvelope.request.requestId)
            expect(logData.logLevel).toEqual(type)
            expect(logData.stack.length).not.toEqual(0)
        })
        each(['error', 'fatal']).it('Should record the %d log', (type: keyof TsLogger) => {
            (logger as any)[type]('test')
            const logData = JSON.parse(stdErr[0])
            expect(logData.argumentsArray).toEqual(['test'])
            expect(logData.instanceName).toEqual(requestEnvelope.request.type)
            expect(logData.requestId).toEqual(requestEnvelope.request.requestId)
            expect(logData.logLevel).toEqual(type)
            expect(logData.stack.length).not.toEqual(0)
        })
    })
    describe('e2e test', () => {
        let stdOut: string[] = []
        let stdErr: string[] = []
        const requestEnvelope: RequestEnvelope = new RequestEnvelopeFactory(new LaunchRequestFactory()).getRequest()
        const logger = LoggerService.getInstance(requestEnvelope, {
            type: 'json',
            stdErr: {
                write: (print: string) => {
                    stdErr.push(print)
                }
            },
            stdOut: {
                write: (print: string) => {
                    stdOut.push(print)
                }
            }
        }).logger
        beforeEach(() => {
            stdOut = []
            stdErr = []
        })
        each(['silly', 'info', 'debug', 'trace']).it('Should record the %d log', (type: keyof TsLogger) => {
            (logger as any)[type]('test')
            const logData = JSON.parse(stdOut[0])
            expect(logData.argumentsArray).toEqual(['test'])
            expect(logData.instanceName).toEqual(requestEnvelope.request.type)
            expect(logData.requestId).toEqual(requestEnvelope.request.requestId)
            expect(logData.logLevel).toEqual(type)
            if (type !== 'trace') expect(logData.stack).toEqual(undefined)
        })
        each(['error', 'fatal']).it('Should record the %d log', (type: keyof TsLogger) => {
            (logger as any)[type]('test')
            const logData = JSON.parse(stdErr[0])
            expect(logData.argumentsArray).toEqual(['test'])
            expect(logData.instanceName).toEqual(requestEnvelope.request.type)
            expect(logData.requestId).toEqual(requestEnvelope.request.requestId)
            expect(logData.logLevel).toEqual(type)
            expect(logData.stack).toEqual(undefined)
        })
    })
})
