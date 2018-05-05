const assert = require('power-assert')
const utils = require('../../../libs/slotManager')
const { handlerInput } = require('../../handlerInput')

describe('libs/slotManager.js', () => {
  let inputParam = {}
  beforeEach(() => {
    inputParam = handlerInput
  })
  describe('#getResolutionSlot()', () => {
    it('should return valid slot value when given intent request with slot', () => {
      const slots = {
        name: 'exampleSlot',
        value: 'Foo',
        resolutions: {
          resolutionsPerAuthority: [
            {
              authority: 'amzn1.er-authority.echo-sdk.amzn1.ask.skill.xxxx-xxxxx-xxxx-xxxx.ExampleSlot',
              status: {
                code: 'ER_SUCCESS_MATCH'
              },
              values: [
                {
                  value: {
                    name: 'Random value',
                    id: 'da8622357e3b1c5e7ed70a36e65fb9fe'
                  }
                },
                {
                  value: {
                    name: 'Another value',
                    id: 'ca2961e59c430930bda6b020863d2af1'
                  }
                }
              ]
            }
          ]
        }
      }
      const result = utils.getResolutionSlot(slots)
      assert.deepEqual(result, {
        name: 'Random value',
        id: 'da8622357e3b1c5e7ed70a36e65fb9fe'
      })
    })
    it('should return empty params if status code is ER_SUCCESS_NO_MATCH', () => {
      const slots = {
        name: 'exampleSlot',
        value: 'Foo',
        resolutions: {
          resolutionsPerAuthority: [
            {
              authority: 'amzn1.er-authority.echo-sdk.amzn1.ask.skill.xxxx-xxxxx-xxxx-xxxx.ExampleSlot',
              status: {
                code: 'ER_SUCCESS_NO_MATCH'
              }
            }
          ]
        }
      }
      const result = utils.getResolutionSlot(slots)
      assert.deepEqual(result, {})
    })
  })
  describe('#getResolutionSlotParam ()', () => {
    const slots = {
      name: 'exampleSlot',
      value: 'Foo',
      resolutions: {
        resolutionsPerAuthority: [
          {
            authority: 'amzn1.er-authority.echo-sdk.amzn1.ask.skill.xxxx-xxxxx-xxxx-xxxx.ExampleSlot',
            status: {
              code: 'ER_SUCCESS_MATCH'
            },
            values: [
              {
                value: {
                  name: 'Random value',
                  id: 'randVal'
                }
              },
              {
                value: {
                  name: 'Another value',
                  id: 'ca2961e59c430930bda6b020863d2af1'
                }
              }
            ]
          }
        ]
      }
    }
    it('should return valid slot name when given intent request with slot', () => {
      const result = utils.getResolutionSlotParam(slots)
      assert.equal(result, 'Random value')
    })
    it('should return valid slot id when given intent request with slot', () => {
      const result = utils.getResolutionSlotParam(slots, 'id')
      assert.equal(result, 'randVal')
    })
  })
  describe('#getSlotValueByName()', () => {
    it('should return valid slot value when given intent request with slot', () => {
      inputParam.requestEnvelope.request.intent.slots = {
        exampleSlot: {
          name: 'exampleSlot',
          value: 'Foo',
          resolutions: {}
        }
      }
      const result = utils.getSlotValueByName(inputParam, 'exampleSlot')
      assert.equal(result, 'Foo')
    })
  })
  describe('#getSlotByName()', () => {
    it('should return valid slot value when given intent request with slot', () => {
      inputParam.requestEnvelope.request.intent.slots = {
        exampleSlot: {
          name: 'exampleSlot',
          value: 'Foo',
          resolutions: {}
        }
      }
      const result = utils.getSlotByName(inputParam, 'exampleSlot')
      assert.deepEqual(result.value, 'Foo')
    })
  })
})
