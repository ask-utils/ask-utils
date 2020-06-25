import { HandlerInput, AttributesManager } from 'ask-sdk'
import { updateSessionAttributes, getSessionAttribute, getSessionAttributes } from '../../libs/attributeManager'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface AttributeType {[key: string]: any}
class MockAttributeManager implements AttributesManager {
    private request: AttributeType = {}
    private session: AttributeType = {}
    private persistent: AttributeType = {}
    private db: AttributeType = {}
    public getRequestAttributes () {
        return this.request
    }

    public getSessionAttributes () {
        return this.session
    }

    public getPersistentAttributes () {
        return Promise.resolve(this.db)
    }

    public setRequestAttributes (attribute: AttributeType) {
        this.request = attribute
    }

    public setSessionAttributes (attribute: AttributeType) {
        this.session = attribute
    }

    public setPersistentAttributes (attribute: AttributeType) {
        this.persistent = attribute
    }

    public savePersistentAttributes () {
        this.db = this.persistent
        return Promise.resolve()
    }
}

const generateHandlerInput = (): HandlerInput => {
    const attributesManager: AttributesManager = new MockAttributeManager()
    const handlerInput = {
        attributesManager
    } as HandlerInput
    return handlerInput
}
describe('attributeManager.ts', () => {
    let handlerInput = generateHandlerInput()
    beforeEach(() => {
        handlerInput = generateHandlerInput()
    })
    describe('updateSessionAttributes()', () => {
        it('should save attributes', () => {
            updateSessionAttributes(handlerInput, { test: 'true' })
            const result = getSessionAttribute(handlerInput, 'test')
            expect(result).toEqual('true')
        })

        it('should add save attributes', () => {
            updateSessionAttributes(handlerInput, { test: 'true' })
            updateSessionAttributes(handlerInput, { test1: 'false' })
            const result = getSessionAttribute(handlerInput, 'test')
            expect(result).toEqual('true')
            const result2 = getSessionAttribute(handlerInput, 'test1')
            expect(result2).toEqual('false')
        })
    })
    describe('getSessionAttributes()', () => {
        it('should get saved attributes', () => {
            updateSessionAttributes(handlerInput, { test: 'true' })
            const result = getSessionAttributes(handlerInput)
            expect(result).toEqual({ test: 'true' })
        })
        it('should add save attributes', () => {
            updateSessionAttributes(handlerInput, { test: 'true' })
            updateSessionAttributes(handlerInput, { test1: 'false' })
            const result = getSessionAttributes(handlerInput)
            expect(result).toEqual({
                test: 'true',
                test1: 'false'
            })
        })
    })
})
