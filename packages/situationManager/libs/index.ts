import {
    AttributesManager
} from 'ask-sdk-core'

export type State = string
export interface SkillState<T extends State = State> {
    current: T;
    next?: T[];
    before?: T[];
}
export class StateManager<T extends State = State> {
    public stateKey: string = '__state'
    private state: SkillState<T>;
    private readonly attributeManager: AttributesManager
    public constructor (attributeManager: AttributesManager, initialState: T) {
        this.attributeManager = attributeManager
        this.state = {
            current: initialState
        }
    }
    private isState (state: any): state is SkillState<T> {
        return state && state.current
    }
    private mergeSessionAttributes (): this {
        const { state, stateKey, attributeManager } = this
        const attributes = {
            ...attributeManager.getSessionAttributes(),
            [stateKey]: state
        }
        attributeManager.setSessionAttributes(attributes)
        return this
    }
    public setState (current: T, next?: T[], before?: T[]): this {
        this.state = {
            current,
            next,
            before
        }
        this.mergeSessionAttributes()
        return this
    }

    public getState (): SkillState<T> {
        const { stateKey, attributeManager } = this

        const attributes = attributeManager.getSessionAttributes()
        const targetState = attributes[stateKey]
        if (!this.isState(targetState)) {
            this.mergeSessionAttributes()
            return this.getState()
        }
        return targetState
    }

    public getCurrentState (): T {
        const targetState = this.getState()
        return targetState.current
    }

    public getNextState (): T[] {
        const targetState = this.getState()
        return targetState.next || []
    }

    public getBeforeState (): T[] {
        const targetState = this.getState()
        return targetState.before || []
    }

    public matchedCurrentState (state: T): boolean {
        return this.getCurrentState() === state
    }
    public includesNextState (state: T): boolean {
        return this.getNextState().includes(state)
    }
    public includesBeforeState (state: T): boolean {
        return this.getBeforeState().includes(state)
    }
}
