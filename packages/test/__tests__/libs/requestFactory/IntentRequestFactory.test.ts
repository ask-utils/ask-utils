import {
    IntentRequestFactory,
    InvalidIntentRequestException
} from '../../../libs/request/IntentRequestFactory'

describe('IntentRequestFactory', () => {
    let factory: IntentRequestFactory
    beforeEach(() => {
        factory = new IntentRequestFactory()
    })
    it('should throw error intent object is not given', () => {
        expect(() => factory.getRequest())
            .toThrowError(InvalidIntentRequestException)
    })

    it('should return intent request', () => {
        expect(factory.setIntent({
            name: 'NewIntent',
            confirmationStatus: 'NONE'
        }).getRequest()).toEqual({
            locale: 'en-US',
            requestId: expect.any(String),
            timestamp: expect.any(String),
            type: 'IntentRequest',
            intent: {
                name: 'NewIntent',
                confirmationStatus: 'NONE'
            }
        })
    })
})
