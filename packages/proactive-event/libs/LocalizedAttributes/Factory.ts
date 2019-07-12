import {
    Types,
    interfaces
} from '../model'

export default class LocalizedAttributesFactory {
    public static init (): interfaces.LocalizedAttributes.Factory {
        const localizedAttributes: Types.LocalizedAttributes = []
        return {
            putLocalizedAttribute (locale: Types.Locale, key: string, text: string) {
                localizedAttributes.push({
                    locale,
                    [key]: text
                })
                return this
            },
            getLocalizedAttributes () {
                return localizedAttributes
            }
        }
    }
}
