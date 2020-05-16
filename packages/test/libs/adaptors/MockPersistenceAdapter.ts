import {
    PersistenceAdapter
} from 'ask-sdk-core'
import { RequestEnvelope } from 'ask-sdk-model'

interface Attributes {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export class MockPersistenceAdapter<T extends Attributes = Attributes> implements PersistenceAdapter {
    private attributes: Partial<T> = {}
    public async getAttributes (): Promise<Partial<T>> {
        return this.attributes
    }
    public async saveAttributes (request: RequestEnvelope, attributes: Partial<T>): Promise<void> {
        // just ignore ts build error
        // eslint-disable-next-line no-self-assign
        request.session = request.session
        this.attributes = attributes
    }
    public async deleteAttributes (request: RequestEnvelope): Promise<void> {
        // just ignore ts build error
        // eslint-disable-next-line no-self-assign
        request.session = request.session
        this.attributes = {}
    }
}
