import {
RequestFactory
}from '../../../libs/requestFactory/RequestFactory'

describe('RequestFactory', () => {
    let factory: RequestFactory
    beforeEach(() => {
        factory = new RequestFactory("SessionEndedRequest")
    })
    it('should return specifix request type', () => {
        expect(factory.getRequest()).toMatchObject({
            locale: 'en-US',
            requestId: expect.any(String),
            timestamp: expect.any(String),
            type: "SessionEndedRequest"
        })
    })
})