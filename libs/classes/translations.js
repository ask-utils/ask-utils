/**
 * Translation Class
 * @example
 * const t = new Translations()
 * t.putLocaleStrings('en-US', {
 *  HELLO: 'Hello'
 * })
 * t.putLocaleStrings('ja-JP', {
 *  HELLO: 'こんにちは'
 * })
 * t.getLanguageStrings()
 * // {
 * //   'en-US': {
 * //     translation: {
 * //       HELLO: 'Hello'
 * //     }
 * //   },
 * //   'ja-JP': {
 * //     translation: {
 * //       HELLO: 'こんにちは'
 * //     }
 * //   }
 * // }
 */
class Translations {
  /**
   * Create helper class
   * @param {string} [defaultLocale='en-US] - Default locale
   */
  constructor (defaultLocale = 'en-US') {
    this.translationObject = {
      translation: {}
    }
    this.languageStrings = {}
    this.languageStrings[defaultLocale] = this.translationObject
  }
  /**
   * Add new translation locale
   * @param {string} locale - locale string
   * @example
   * // add Japanese strings
   * const t = new Translations()
   * t.addLocale('ja-JP')
   */
  addLocale (locale) {
    if (this.languageStrings[locale]) return
    this.languageStrings[locale] = this.translationObject
  }
  /**
   * Put new translation texts
   * @param {string} locale - target locale string
   * @param {object} messages - translation texts
   * @example
   * // add English Messages
   * const t = new Translations()
   * t.putLocaleStrings('en-US', {
   *  HELLO: 'Hello'
   * })
   * @example
   * // add Japanese Messages
   * const t = new Translations()
   * t.putLocaleStrings('ja-JP', {
   *  HELLO: 'こんにちは'
   * })
   */
  putLocaleStrings (locale, messages) {
    if (!locale) throw new Error('locale is required')
    if (!messages || Object.keys(messages).length < 1) throw new Error('message object is required')
    if (typeof messages !== 'object') throw new Error('message should be object')
    if (!this.languageStrings[locale]) this.addLocale(locale)
    this.languageStrings[locale] = {
      translation: messages
    }
  }
  /**
   * Add new translation texts
   * @param {string} locale - target locale string
   * @param {string} key - translation message key
   * @param {string} message - translation text
   * @example
   * // add English Messages
   * const t = new Translations()
   * t.addLocaleStrings('en-US', 'HELLO': 'Hello')
   * @example
   * // You can add more translation text after run `putLocaleStrings`
   * const t = new Translations()
   * t.putLocaleStrings('en-US', {
   *  HELLO: 'Hello'
   * })
   * t.addLocaleStrings('en-US', 'World': 'World')
   */
  addLocaleStrings (locale, key, message) {
    this.languageStrings[locale].translation[key] = message
  }
  /**
   * Get translation string
   * @return {object} - translation strings
   */
  getLanguageStrings () {
    return this.languageStrings
  }
}
module.exports = Translations
