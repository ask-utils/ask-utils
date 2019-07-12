import { HandlerInput, ResponseFactory } from 'ask-sdk-core'
import {
    HandlerBuilder
} from '../../../../libs/requestHandlers/factories/Base'

describe('libs/requestHandlers/factories/Base.ts', () => {
    describe('Class HandlerBuilder', () => {
        let builder = new HandlerBuilder()
        // eslint-disable-next-line no-return-assign
        beforeEach(() => builder = new HandlerBuilder())
        describe('default', () => {
            it('should return true if no handle added', () => {
                expect(builder.getHandler().canHandle({} as HandlerInput))
                    .toEqual(true)
            })
            it('should throw error if no handle added', () => {
                expect(() => builder.getHandler().handle({} as HandlerInput))
                    .toThrow()
            })
        })
        describe('custom handler condition', () => {
            it('should return false when handle condition updated', () => {
                builder.setHandleCondition(() => false)
                expect(builder.getHandler().canHandle({} as HandlerInput))
                    .toEqual(false)
            })
            it('should return custome response', () => {
                builder.setHandle(handlerInput => {
                    return handlerInput.responseBuilder.speak('hello').getResponse()
                })
                expect(builder.getHandler().handle({
                    responseBuilder: ResponseFactory.init()
                } as HandlerInput))
                    .toEqual({
                        outputSpeech: {
                            ssml: '<speak>hello</speak>',
                            type: 'SSML'
                        }
                    })
            })
        })
    })
})
