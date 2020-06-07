import {
    MockPersistenceAdapter,
    HandlerInputFactory,
    RequestEnvelopeFactory,
    LaunchRequestFactory
} from '@ask-utils/test'
import { HandlerInput } from 'ask-sdk-core'
import {
    PersistanteAttributesManager
} from '../index'

describe('PersistenteAttributesManager.service.ts', () => {
    let handlerInput: HandlerInput
    let handlerInput2: HandlerInput
    let adapter = new MockPersistenceAdapter()
    beforeEach(() => {
        adapter = new MockPersistenceAdapter()
        handlerInput = new HandlerInputFactory(
            new RequestEnvelopeFactory(
                new LaunchRequestFactory()
            )
        ).setPersistanceAdapter(adapter).create()
        handlerInput2 = new HandlerInputFactory(
            new RequestEnvelopeFactory(
                new LaunchRequestFactory()
            )
        ).setPersistanceAdapter(adapter).create()
    })
    describe('Singleton test', () => {
        it('| Should save and get next request', async () => {
            const persistentManager = PersistanteAttributesManager.getInstance(handlerInput.attributesManager)

            await persistentManager.updatePersistentAttributes({
                test: true
            })
            await persistentManager.save()

            expect(await handlerInput2.attributesManager.getPersistentAttributes()).toEqual({
                test: true
            })
        })
    })

    describe('Class method test', () => {
        it('| should not save adn get persisted attributes without execute save method', async () => {
            const persistentManager = new PersistanteAttributesManager(handlerInput.attributesManager)

            await persistentManager.updatePersistentAttributes({
                test: true
            })

            expect(await handlerInput2.attributesManager.getPersistentAttributes()).toEqual({})
        })
        it('| should save adn get persisted attributes', async () => {
            const persistentManager = new PersistanteAttributesManager(handlerInput.attributesManager)

            await persistentManager.updatePersistentAttributes({
                test: true
            })
            await persistentManager.save()

            expect(await handlerInput2.attributesManager.getPersistentAttributes()).toEqual({
                test: true
            })
        })
        it('| Should execute savePersistentAttribuets if any prop has been updated', async () => {
            const { attributesManager } = handlerInput
            attributesManager.savePersistentAttributes = jest.fn()
            const persistentManager = new PersistanteAttributesManager(attributesManager)

            await persistentManager.updatePersistentAttributes({
                test: true
            })
            await persistentManager.save()
            expect(attributesManager.savePersistentAttributes).toHaveBeenCalled()
        })
        it('| Should not execute savePersistentAttribuets if any prop has been updated', async () => {
            const { attributesManager } = handlerInput
            attributesManager.savePersistentAttributes = jest.fn()
            const persistentManager = new PersistanteAttributesManager(attributesManager)

            await persistentManager.save()
            expect(attributesManager.savePersistentAttributes).not.toHaveBeenCalled()
        })
        it('| Should execute savePersistentAttribuets2 times', async () => {
            const { attributesManager } = handlerInput
            attributesManager.savePersistentAttributes = jest.fn()
            const persistentManager = new PersistanteAttributesManager(attributesManager)

            await persistentManager.updatePersistentAttributes({
                test: true
            })
            await persistentManager.save()
            await persistentManager.save()
            expect(attributesManager.savePersistentAttributes).toHaveBeenCalledTimes(1)
        })
        it('| Should execute savePersistentAttribuets2 times', async () => {
            const { attributesManager } = handlerInput
            attributesManager.savePersistentAttributes = jest.fn()
            const persistentManager = new PersistanteAttributesManager(attributesManager)

            await persistentManager.updatePersistentAttributes({
                test: true
            })
            await persistentManager.save()
            await persistentManager.updatePersistentAttributes({
                test: true
            })
            await persistentManager.save()
            expect(attributesManager.savePersistentAttributes).toHaveBeenCalledTimes(2)
        })
        it('| Should merge exists props', async () => {
            const persistentManager = new PersistanteAttributesManager(handlerInput.attributesManager)

            await persistentManager.updatePersistentAttributes({
                test: true,
                test1: true
            })
            await persistentManager.save()

            await persistentManager.updatePersistentAttributes({
                test1: false,
                test2: false
            })
            await persistentManager.save()
            expect(await handlerInput2.attributesManager.getPersistentAttributes()).toEqual({
                test: true,
                test1: false,
                test2: false
            })
        })
    })
})
