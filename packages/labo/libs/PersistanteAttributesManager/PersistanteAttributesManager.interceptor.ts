import { ResponseInterceptor } from 'ask-sdk-core'
import { PersistanteAttributesManager } from './PersistanteAttributesManager.service'

/**
 * ResponseInterceptor to auto save the persistent attributes if any props has beend update
 */
export const SavePersistentAttributesInterceptor: ResponseInterceptor = {
    async process ({ attributesManager }): Promise<void> {
        const persistentAttributesManager = PersistanteAttributesManager.getInstance(attributesManager)
        await persistentAttributesManager.save()
    }
}
