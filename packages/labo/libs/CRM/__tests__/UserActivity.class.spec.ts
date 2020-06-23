import {
    UserActivityManager
} from '../UserActivity.classs'
import { HandlerInputFactory, RequestEnvelopeFactory, LaunchRequestFactory, MockPersistenceAdapter } from '@ask-utils/test'
import { HandlerInput } from 'ask-sdk-core'

const setupClients = () => {
    const handlerInput: HandlerInput = new HandlerInputFactory(
        new RequestEnvelopeFactory(
            new LaunchRequestFactory()
        )
    ).setPersistanceAdapter(new MockPersistenceAdapter()).create()
    const mgr = new UserActivityManager(handlerInput)
    return {
        handlerInput,
        mgr
    }
}

describe('CRM/__tests__/UserActivity.class.ts', () => {
    describe('UserActivityManager', () => {
        let mgr: UserActivityManager
        describe('isFirstSkillInvocation', () => {
            beforeEach(() => {
                const clients = setupClients()
                mgr = clients.mgr
            })
            it('should return true by default', async () => {
                const result = await mgr.isFirstSkillInvocation()
                expect(result).toEqual(true)
            })
            it('should return true when invoke skill first time', async () => {
                await mgr.trackSkillInvocation()
                const result = await mgr.isFirstSkillInvocation()
                expect(result).toEqual(true)
            })
            it('should return false when invoke skill at least twice', async () => {
                await mgr.trackSkillInvocation()
                await mgr.trackSkillInvocation()
                const result = await mgr.isFirstSkillInvocation()
                expect(result).toEqual(false)
            })
        })
        describe('getLastActivity', () => {
            beforeEach(() => {
                const clients = setupClients()
                mgr = clients.mgr
            })
            it('should get default activity data', async () => {
                const result = await mgr.getLastActivity()
                expect(result).toMatchObject({
                    invocationNumber: 0,
                    lastInvocationTime: expect.any(Number)
                })
            })
            it('should increase invocation number when invoke trackSkillInvocation once', async () => {
                await mgr.trackSkillInvocation()
                const result = await mgr.getLastActivity()
                expect(result).toMatchObject({
                    invocationNumber: 1,
                    lastInvocationTime: expect.any(Number)
                })
            })
            it('should increase invocation number when invoke trackSkillInvocation twice', async () => {
                await mgr.trackSkillInvocation()
                await mgr.trackSkillInvocation()
                const result = await mgr.getLastActivity()
                expect(result).toMatchObject({
                    invocationNumber: 2,
                    lastInvocationTime: expect.any(Number)
                })
            })
        })
    })
})
