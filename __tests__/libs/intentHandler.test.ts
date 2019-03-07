import {HandlerInput} from 'ask-sdk';
import {IntentRequest, Request, LaunchRequest, DialogState} from 'ask-sdk-model';
import {
  isLaunchRequest
} from '../../libs/intentHandler'

const generateHandlerInput = (request: Request): HandlerInput => {
  const handlerInput = {
    requestEnvelope: {
      request
    }
  } as HandlerInput
  return handlerInput
}

const getIntentRequest = (name: string, dialogState: DialogState = 'COMPLETED'):IntentRequest => {
  return {
    type: 'IntentRequest',
    requestId: 'string',
    timestamp: 'string',
    dialogState,
    intent: {
      name,
      confirmationStatus: 'NONE'
    }
  }
}

const launchRrequest: LaunchRequest = {
  type: 'LaunchRequest',
  requestId: 'string',
  timestamp: 'string',
}

describe('libs/intentHandler.ts', () => {
  describe('isLaunchRequest()', () => {
    it('should return true when intent is LaunchRequest', () => {
      const handlerInput = generateHandlerInput(launchRrequest)
      const result = isLaunchRequest(handlerInput)
      expect(result).toEqual(true)
    })
    it('should return false when intent is IntentRequest', () => {
      const request = getIntentRequest('test')
      const handlerInput = generateHandlerInput(request)
      const result = isLaunchRequest(handlerInput)
      expect(result).toEqual(false)
    })
  })
})