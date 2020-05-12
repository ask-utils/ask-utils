import {
    HandlerInputFactory,
    RequestEnvelopeFactory,
    LaunchRequestFactory,
    MockPersistenceAdapter
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
    it('should failed to access persistence attributes by default', async () => {
        const HandlerInput = new HandlerInputFactory(
            new RequestEnvelopeFactory(
                new LaunchRequestFactory()
            )
        )
        const handlerInput = HandlerInput.create()
        expect(() => {
            handlerInput.attributesManager.setPersistentAttributes({
                test: 'true'
            })
        }).toThrow('Cannot set PersistentAttributes without persistence adapter!')
    })
    it('should set and get persistence attributes when using MockPersistanceAdapter', async () => {
        const HandlerInput = new HandlerInputFactory(
            new RequestEnvelopeFactory(
                new LaunchRequestFactory()
            )
        ).setPersistanceAdapter(new MockPersistenceAdapter())
        const handlerInput = HandlerInput.create()
        await handlerInput.attributesManager.setPersistentAttributes({
            test: 'true'
        })
        await handlerInput.attributesManager.savePersistentAttributes()
        expect(handlerInput.attributesManager.getPersistentAttributes()).resolves.toEqual({
            test: 'true'
        })
    })
})
