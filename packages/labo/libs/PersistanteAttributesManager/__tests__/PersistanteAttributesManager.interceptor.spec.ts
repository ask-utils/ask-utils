import {
    MockPersistenceAdapter,
    HandlerInputFactory,
    RequestEnvelopeFactory,
    LaunchRequestFactory
} from '@ask-utils/test'
import {
    SavePersistentAttributesInterceptor,
    PersistanteAttributesManager
} from '../index'
import { HandlerInput } from 'ask-sdk-core'

describe('PersistanteAttributesManager.interceptor.ts', () => {
    let handlerInput: HandlerInput
    let adapter = new MockPersistenceAdapter()
    const savePersistentAttributes = jest.fn()
    beforeEach(() => {
        adapter = new MockPersistenceAdapter()
        handlerInput = new HandlerInputFactory(
            new RequestEnvelopeFactory(
                new LaunchRequestFactory()
            )
        ).setPersistanceAdapter(adapter).create()
        handlerInput.attributesManager.savePersistentAttributes = savePersistentAttributes
    })
    it('| Should not execute savePersistentAttribuets if no prop has been updated', async () => {
        await SavePersistentAttributesInterceptor.process(handlerInput)
        expect(savePersistentAttributes).not.toHaveBeenCalled()
    })
    it('| Should execute savePersistentAttribuets if any prop has been updated', async () => {
        const persistentManager = PersistanteAttributesManager.getInstance(handlerInput.attributesManager)

        await persistentManager.updatePersistentAttributes({
            test: true
        })
        await SavePersistentAttributesInterceptor.process(handlerInput)
        expect(savePersistentAttributes).toHaveBeenCalled()
    })
})
