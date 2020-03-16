import {
    HandlerInputFactory,
    RequestEnvelopeFactory,
    LaunchRequestFactory
} from '../../../libs/index'

describe('HandlerInputFactory', () => {
    it('should return valid intent name when given LaunchRequest Factory', () => {
        const HandlerInput = new HandlerInputFactory(
            new RequestEnvelopeFactory(
                new LaunchRequestFactory()
            )
        )
        const handlerInput = HandlerInput.create()
        expect(handlerInput.requestEnvelope.request.type).toEqual('LaunchRequest')
    })
    it('should injected session attributes value when given from requestEnvelopeFactory', () => {
        const request = new LaunchRequestFactory()
        const requestEnvelope = new RequestEnvelopeFactory(request)
        requestEnvelope.session.putAttributes({
            name: 'hello',
            label: 123
        })
        const HandlerInput = new HandlerInputFactory(requestEnvelope)
        const handlerInput = HandlerInput.create()

        expect(handlerInput.attributesManager.getSessionAttributes()).toEqual({
            name: 'hello',
            label: 123
        })
    })
})
