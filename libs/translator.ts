export interface TranslationObject {
    translation: {
        [key: string]: string;
    };
}
export interface TranslationBuilder {
    addLocale(locale: string): TranslationBuilder;
    putLocaleStrings(locale: string, messages: string): TranslationBuilder;
    addLocaleStrings(locale: string, key: string, message: string): TranslationBuilder;
    getLanguageStrings(): TranslationObject | {};
}

// beta
export class TranslationFactory {
    public static init (): TranslationBuilder {
        const translationObject: TranslationObject | null = null
        const languageStrings: {
            [lang: string]: TranslationObject;
        } = {}
        return {
            addLocale (locale: string) {
                if (languageStrings[locale] || !translationObject) return this
                languageStrings[locale] = translationObject
                return this
            },
            putLocaleStrings (locale: string, messages: string) {
                if (!locale) throw new Error('locale is required')
                if (!messages || Object.keys(messages).length < 1) throw new Error('message object is required')
                if (typeof messages !== 'object') throw new Error('message should be object')
                if (!languageStrings[locale]) this.addLocale(locale)
                languageStrings[locale] = {
                    translation: messages
                }
                return this
            },
            addLocaleStrings (locale: string, key: string, message: string) {
                languageStrings[locale].translation[key] = message
                return this
            },
            getLanguageStrings () {
                return languageStrings
            }
        }
    }
}

const TranslationGenerator = TranslationFactory.init()
export default TranslationGenerator
