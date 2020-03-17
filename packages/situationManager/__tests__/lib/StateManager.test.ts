/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    AttributesManagerFactory,
    AttributesManager
} from 'ask-sdk-core'
import {
    RequestEnvelopeFactory,
    RequestFactory
} from '@ask-utils/test'
import {
    StateManager
} from '../../libs/index'

const createAttributeManager = (requestFactory: RequestFactory = new RequestFactory('LaunchRequest')) => {
    const request = (new RequestEnvelopeFactory(
        requestFactory
    )).getRequest()
    const att = AttributesManagerFactory.init({
        requestEnvelope: request
    })
    return att
}

describe('StateManager', () => {
    let attributesManager: AttributesManager
    beforeEach(() => {
        attributesManager = createAttributeManager()
    })
    it('should return initilized state', () => {
        type State = 'init' | 'help' | 'end'
        const mgr = new StateManager<State>(attributesManager, { current: 'init' })
        expect(mgr.getCurrentState()).toEqual('init')
    })
    it('should return initilized state', () => {
        type State = 'init' | 'help' | 'end'
        const mgr = new StateManager<State>(attributesManager, { current: 'init' })
        mgr.setState('help')
        expect(mgr.matchedCurrentState('help')).toEqual(true)
    })
    it('should return initilized state', () => {
        type State = 'init' | 'help' | 'end'
        const mgr = new StateManager<State>(attributesManager, { current: 'init' })
        expect(mgr.matchedCurrentState('help')).toEqual(false)
    })
    it('should return state object', () => {
        type State = 'init' | 'help' | 'end' | 'state1' | 'state2' | 'state3'
        const state = new StateManager<State>(attributesManager, { current: 'init' })
        state.setState('state2', ['help', 'state3', 'end'], ['init', 'state1'])
        expect(state.getState()).toEqual({
            current: 'state2',
            next: ['help', 'state3', 'end'],
            before: ['init', 'state1']
        })
    })
    describe('flow test', () => {
        type State = 'init' | 'help' | 'end'
        let stateManager: StateManager
        beforeAll(() => {
            attributesManager = createAttributeManager()
            stateManager = new StateManager<State>(attributesManager, { current: 'init' })
        })
        afterAll(() => {
            attributesManager = createAttributeManager()
        })
        it('should return init state when call first time', () => {
            expect(stateManager.getCurrentState()).toEqual('init')
        })
        it('should return help state when update the state', () => {
            stateManager.setState('help', ['end'])
            expect(stateManager.getCurrentState()).toEqual('help')
        })
        it('should return help state when update the state', () => {
            stateManager.setState('end')
            expect(stateManager.getCurrentState()).toEqual('end')
        })
    })
})
