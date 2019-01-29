import {HandlerInput} from 'ask-sdk';
import {IntentRequest, DialogState, Request} from 'ask-sdk-model';
import {
  isDialogStarted,
  getDialogState
} from '../../libs/dialog'


const generateHandlerInput = (request: Request): HandlerInput => {
  const handlerInput = {
    requestEnvelope: {
      request: request
    }
  } as HandlerInput
  return handlerInput
}
describe('', () => {
  describe('getDialogState()', () => {
    const request = {
      dialogState: 'STARTED'
    } as IntentRequest
    it('should get valid state', () => {
      const dialog = getDialogState(request)
      expect(dialog).toEqual('STARTED')
    })
  })
  describe('isDialogStarted()', () => {
    it('should return true when state is STRETED', () => {
      const request = {
        dialogState: 'STARTED',
        type: 'IntentRequest'
      } as IntentRequest
      const handlerInput = generateHandlerInput(request)
      const result = isDialogStarted(handlerInput)
      expect(result).toEqual(true)
    })
    it('should return true when state is IN_PROGRESS', () => {
      const request = {
        dialogState: 'IN_PROGRESS',
        type: 'IntentRequest'
      } as IntentRequest
      const handlerInput = generateHandlerInput(request)
      const result = isDialogStarted(handlerInput)
      expect(result).toEqual(false)
    })

    it('should return true when state is COMPLETED', () => {
      const request = {
        dialogState: 'COMPLETED',
        type: 'IntentRequest'
      } as IntentRequest
      const handlerInput = generateHandlerInput(request)
      const result = isDialogStarted(handlerInput)
      expect(result).toEqual(false)
    })
  })
})