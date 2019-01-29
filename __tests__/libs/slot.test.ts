import { Slot } from 'ask-sdk-model'
import {HandlerInput} from 'ask-sdk';
import {
  getSlot
} from '../../libs/slot'

describe('libs/slot.ts', () => {
  describe('getSlot)', () => {
    const getHandlerInput = (slots: {
      [key: string]: Slot;
  }): HandlerInput => {
      return {
        requestEnvelope: {
          request: {
            type: 'IntentRequest',
            intent: {
              slots
            }
          }
        }
      } as HandlerInput
    }
    it('should return aaa when matched slot is exists', () => {
      const handlerInput = getHandlerInput({
        test: {
          name: 'test',
          value: 'aaa',
          confirmationStatus: 'NONE'
        }
      })
      const message = getSlot(handlerInput, 'test')
      expect(message).toEqual({
        name: 'test',
        value: 'aaa',
        confirmationStatus: 'NONE'
      })
    })
    it('should return empty string when matched slot is not exists', () => {
      const handlerInput = getHandlerInput({
        hoge: {
          name: 'hoge',
          value: 'aaa',
          confirmationStatus: 'NONE'
        }
      })
      const message = getSlot(handlerInput, 'test')
      expect(message).toEqual('')
    })
  })
})