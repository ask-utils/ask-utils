import {
    Context
} from 'ask-sdk-core/node_modules/ask-sdk-model'
import { SystemFactory } from './SystemFactory'

export class ContextFactory {
    public readonly system = new SystemFactory()
    private context: Context = {
        System: this.system.getSystem()
    }

    public putContext (context: Context): this {
        this.context = context
        return this
    }

    public getContext (): Context {
        return {
            ...this.context,
            System: this.system.getSystem()
        }
    }
}
