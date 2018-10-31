const assert = require('power-assert')
// target
const Translations = require('../../../../libs/classes/translations')

describe('Class/Translations', () => {
  describe('constructor', () => {
    it('should initialize default language', () => {
      const c = new Translations()
      assert.deepEqual(c.getLanguageStrings(), {
        'en-US': {
          translation: {}
        }
      })
    })
    it('should initialize default language when given ja-JP', () => {
      const c = new Translations('ja-JP')
      assert.deepEqual(c.getLanguageStrings(), {
        'ja-JP': {
          translation: {}
        }
      })
    })
  })
  describe('#addLocale()', () => {
    it('should add ja-JP locale', () => {
      const c = new Translations()
      c.addLocale('ja-JP')
      assert.deepEqual(c.getLanguageStrings(), {
        'en-US': {
          translation: {}
        },
        'ja-JP': {
          translation: {}
        }
      })
    })
    it('should nothing to do when given already added locale', () => {
      const c = new Translations()
      c.addLocale('en-US')
      assert.deepEqual(c.getLanguageStrings(), {
        'en-US': {
          translation: {}
        }
      })
    })
  })
  describe('putLocaleString', () => {
    let c
    beforeEach(() => {
      c = new Translations()
    })
    it('should put locale string', () => {
      c.putLocaleStrings('en-US', {
        HELLO: 'hello'
      })
      assert.deepEqual(c.getLanguageStrings(), {
        'en-US': {
          translation: {
            HELLO: 'hello'
          }
        }
      })
    })
    it('should put new locale string', () => {
      c.putLocaleStrings('ja-JP', {
        HELLO: 'こんにちは'
      })
      assert.deepEqual(c.getLanguageStrings(), {
        'en-US': {
          translation: {}
        },
        'ja-JP': {
          translation: {
            HELLO: 'こんにちは'
          }
        }
      })
    })
    /*
    * in nodeV8 it does not work
    describe('Exception', () => {
      it('should throw error when local is empty', () => {
        assert.throws(
          () => c.putLocaleStrings(),
          {
            name: 'Error',
            message: 'locale is required'
          }
        )
      })
      it('should throw error when message is empty', () => {
        assert.throws(
          () => c.putLocaleStrings('en-US'),
          {
            name: 'Error',
            message: 'message object is required'
          }
        )
      })
      it('should throw error when message is string', () => {
        assert.throws(
          () => c.putLocaleStrings('en-US', 'string'),
          {
            name: 'Error',
            message: 'message should be object'
          }
        )
      })
    })
    */
  })
  describe('addLocaleStrings', () => {
    let c
    beforeEach(() => {
      c = new Translations()
    })
    it('should add locale string', () => {
      c.addLocaleStrings('en-US', 'HELLO', 'hello')
      assert.deepEqual(c.getLanguageStrings(), {
        'en-US': {
          translation: {
            HELLO: 'hello'
          }
        }
      })
    })
    it('should add locale string', () => {
      c.putLocaleStrings('en-US', {
        HELLO: 'hello'
      })
      c.addLocaleStrings('en-US', 'WORLD', 'world')
      assert.deepEqual(c.getLanguageStrings(), {
        'en-US': {
          translation: {
            HELLO: 'hello',
            WORLD: 'world'
          }
        }
      })
    })
  })
})
