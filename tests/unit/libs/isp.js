const assert = require('power-assert')
const {
  isEntitled,
  getAllEntitledProducts,
  getEntitledProducts,
  isPurchasable,
  getAllPurchasableProducts,
  getPurchasableProducts,
  getInSkillProducts,
  getSpeakableListOfProducts
} = require('../../../libs/isp')
const { getHandlerInput, getRequestEnvelopeMock } = require('../../../libs/testUtils')
const handlerInput = getHandlerInput(getRequestEnvelopeMock())

describe('libs/isp.js', () => {
  describe('#isEntitled()', () => {
    it('should return false when given NOT_ENTITLED product', () => {
      const product = {
        entitled: 'NOT_ENTITLED'
      }
      assert.equal(isEntitled(product), false)
    })
    it('should return true when given ENTITLED product', () => {
      const product = {
        entitled: 'ENTITLED'
      }
      assert.equal(isEntitled(product), true)
    })
    it('should return true when given invalid product', () => {
      const product = {
        entitled: 'invalid'
      }
      assert.equal(isEntitled(product), false)
    })
  })
  describe('#getAllEntitledProducts()', () => {
    it('should return list of entitled products', () => {
      const products = [{
        name: '1st product',
        entitled: 'NOT_ENTITLED'
      }, {
        name: '2nd product',
        entitled: 'ENTITLED'
      }]
      const entitledProducts = getAllEntitledProducts(products)
      assert.deepEqual(entitledProducts, [{
        name: '2nd product',
        entitled: 'ENTITLED'
      }])
    })
    it('should return empty list when prop is empty', () => {
      const entitledProducts = getAllEntitledProducts([])
      assert.deepEqual(entitledProducts, [])
    })
  })
  describe('#getEntitledProducts()', () => {
    it('should return list of entitled products', async () => {
      const entitledProducts = await getEntitledProducts(handlerInput)
      assert.deepEqual(entitledProducts, [{
        productId: 'amzn1.adg.product.yyy-yyy-yyy',
        referenceName: 'my-example-quiz',
        type: 'ENTITLEMENT',
        name: 'example quiz',
        summary: 'example quiz game summary',
        entitled: 'ENTITLED',
        purchasable: 'NOT_PURCHASABLE',
        activeEntitlementCount: 1,
        purchaseMode: 'TEST'
      }])
    })
  })

  describe('#isPurchasable()', () => {
    it('should return true when given NOT_ENTITLED & PURCHASABLE', () => {
      const product = {
        entitled: 'NOT_ENTITLED',
        purchasable: 'PURCHASABLE'
      }
      assert.equal(isPurchasable(product), true)
    })
    it('should return false when given ENTITLED & PURCHASABLE', () => {
      const product = {
        entitled: 'ENTITLED',
        purchasable: 'PURCHASABLE'
      }
      assert.equal(isPurchasable(product), false)
    })
    it('should return false when given ENTITLED & NOT_PURCHASABLE', () => {
      const product = {
        entitled: 'ENTITLED',
        purchasable: 'NOT_PURCHASABLE'
      }
      assert.equal(isPurchasable(product), false)
    })
    it('should return false when given NOT_ENTITLED & NOT_PURCHASABLE', () => {
      const product = {
        entitled: 'NOT_ENTITLED',
        purchasable: 'NOT_PURCHASABLE'
      }
      assert.equal(isPurchasable(product), false)
    })
    it('should return true when given invalid product', () => {
      const product = {
        entitled: 'invalid',
        purchasable: 'PURCHASABLE'
      }
      assert.equal(isPurchasable(product), false)
    })
  })

  describe('#getAllPurchasableProducts()', () => {
    it('should return list of purchasable products', () => {
      const products = [{
        name: '1st product',
        entitled: 'NOT_ENTITLED',
        purchasable: 'PURCHASABLE'
      }, {
        name: '2nd product',
        entitled: 'ENTITLED',
        purchasable: 'PURCHASABLE'
      }, {
        name: '3rd product',
        entitled: 'ENTITLED',
        purchasable: 'NOT_PURCHASABLE'
      }, {
        name: '4th product',
        entitled: 'NOT_ENTITLED',
        purchasable: 'NOT_PURCHASABLE'
      }]
      const purchasableProducts = getAllPurchasableProducts(products)
      assert.deepEqual(purchasableProducts, [{
        name: '1st product',
        entitled: 'NOT_ENTITLED',
        purchasable: 'PURCHASABLE'
      }])
    })
    it('should return empty list when prop is empty', () => {
      const purchasableProducts = getAllPurchasableProducts([])
      assert.deepEqual(purchasableProducts, [])
    })
  })
  describe('#getEntitledProducts()', () => {
    it('should return list of entitled products', async () => {
      const entitledProducts = await getPurchasableProducts(handlerInput)
      assert.deepEqual(entitledProducts, [{
        productId: 'amzn1.adg.product.zzz-zzz-zzz',
        referenceName: 'my-example-news',
        type: 'ENTITLEMENT',
        name: 'example news',
        summary: 'example news summary',
        entitled: 'NOT_ENTITLED',
        purchasable: 'PURCHASABLE',
        activeEntitlementCount: 1,
        purchaseMode: 'TEST'
      }])
    })
  })
  describe('#getInSkillProducts()', () => {
    it('should return valid items', async () => {
      const products = await getInSkillProducts(handlerInput)
      assert.notEqual(products.length, 0)
    })
  })
  describe('#getSpeakableListOfProducts()', () => {
    it('should return valid string', () => {
      const lists = [{
        name: 'product one'
      }, {
        name: 'product two'
      }, {
        name: 'product three'
      }, {
        value: 'hoge'
      }]
      const text = getSpeakableListOfProducts(lists)
      assert.equal(text, 'product one, product two, product three')
    })
    it('should return empty', () => {
      const text = getSpeakableListOfProducts([])
      assert.equal(text, '')
    })
  })
})
