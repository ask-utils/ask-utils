import {
    Context
} from 'ask-sdk-core/node_modules/ask-sdk-model'
import { SystemFactory } from './SystemFactory'

export class ContextFactory {
    public readonly system = new SystemFactory()

    public getContext (): Context {
        return {
            System: this.system.getSystem()
        }
    }
}
