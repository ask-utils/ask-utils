import { Permissions } from 'ask-sdk-model'
import {HandlerInput} from 'ask-sdk';
import {
  isConsented 
} from '../../libs/user'

describe('libs/ruser.ts', () => {
  describe('isConsented ()', () => {
    const getHandlerInput = (permissions: Permissions): HandlerInput => {
      return {
        requestEnvelope: {
          context: {
            System: {
              user: {
                permissions
              }
            }
          }
        }
      } as HandlerInput
    }
    it('should return false when props is empty', () => {
      const handlerInput = getHandlerInput({})
      const message = isConsented (handlerInput)
      expect(message).toEqual(false)
    })
    it('should return true when contentToken is not empty', () => {
      const handlerInput = getHandlerInput({
        consentToken: 'aaaa'
      })
      const message = isConsented (handlerInput)
      expect(message).toEqual(true)
    })
  })
})