import {
    LaunchRequestFactory
} from '../../../libs/request/LaunchRequestFactory'

describe('LaunchRequestFactory', () => {
    let factory: LaunchRequestFactory
    beforeEach(() => {
        factory = new LaunchRequestFactory()
    })
    it('should return default item', () => {
        expect(factory.getRequest()).toMatchObject({
            locale: 'en-US',
            requestId: expect.any(String),
            timestamp: expect.any(String),
            type: 'LaunchRequest'
        })
    })
})
