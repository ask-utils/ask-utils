class Translations {
  constructor (defaultLocale = 'en-US') {
    this.translationObject = {
      translation: {}
    }
    this.languageStrings = {}
    this.languageStrings[defaultLocale] = this.translationObject
  }
  addLocale (locale) {
    if (this.languageStrings[locale]) return
    this.languageStrings[locale] = this.translationObject
  }
  putLocaleStrings (locale, messages) {
    if (!locale) throw new Error('locale is required')
    if (!messages || Object.keys(messages).length < 1) throw new Error('message object is required')
    if (typeof messages !== 'object') throw new Error('message should be object')
    if (!this.languageStrings[locale]) this.addLocale(locale)
    this.languageStrings[locale] = {
      translation: messages
    }
  }
  addLocaleStrings (locale, key, message) {
    this.languageStrings[locale].translation[key] = message
  }
  getLanguageStrings () {
    return this.languageStrings
  }
}
module.exports = Translations
