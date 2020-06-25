import { AttributesManager } from 'ask-sdk-core'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Logger {
    debug(...args: any): void;
    error(...args: any): void;
}

export interface PersistanteAttributes {
    [key: string]: any;
}

class DefaultLogger implements Logger {
    public debug (...args: any[]): void {
        console.debug(...args)
    }

    public info (...args: any[]): void {
        console.info(...args)
    }

    public error (...args: any[]): void {
        console.error(...args)
    }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Simply wrapper of ask-sdk persistentAttributesManager
 */
export class PersistanteAttributesManager<T extends PersistanteAttributes = PersistanteAttributes> {
    private static instance: PersistanteAttributesManager
    private readonly logger: Logger = new DefaultLogger()
    private hasUpdated: boolean = false

    public static getInstance<T extends PersistanteAttributes = PersistanteAttributes> (attributesManager: AttributesManager): PersistanteAttributesManager<T> {
        if (!this.instance) {
            this.instance = new PersistanteAttributesManager(attributesManager)
        }
        return this.instance as PersistanteAttributesManager<T>
    }

    protected readonly attributeManager: AttributesManager
    public constructor (attributesManager: AttributesManager) {
        this.attributeManager = attributesManager
    }

    public async getPersistentAttributes (defaultAttributes: T): Promise<T> {
        try {
            const data = await this.attributeManager.getPersistentAttributes()
            if (data) {
                return {
                    ...defaultAttributes,
                    ...data
                }
            }
        } catch (e) {
            this.logger.debug(e.name)
            this.logger.error(e)
        }
        this.attributeManager.setPersistentAttributes(defaultAttributes)
        return defaultAttributes
    }

    /**
     * Just update persistentAttributes with auto merge exsits props
     * [IMPORTANT] We have to execure `save()`method after update the attributes.
     * @param attributes
     * @example
     * ```
     * const persistentAttributesManager = PersistanteAttributesManager.getInstance(handlerInput.attributesManager)
     *  await persistentAttributesManager.updatePersistentAttributes({
     *      name: 'John'
     *  })
     *  await persistentAttributesManager.save()
     *  ```
     */
    public async updatePersistentAttributes (attributes: T): Promise<void> {
        try {
            const data = await this.attributeManager.getPersistentAttributes()
            this.attributeManager.setPersistentAttributes(Object.assign({}, data, attributes))
        } catch (e) {
            this.attributeManager.setPersistentAttributes(attributes)
        }
        this.hasUpdated = true
    }

    /**
     * Update attributes if the prop has been updated
     */
    public async save (): Promise<void> {
        if (!this.hasUpdated) return
        await this.attributeManager.savePersistentAttributes()
        this.hasUpdated = false
    }
}
