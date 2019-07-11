import { HandlerInput, isNewSession } from 'ask-sdk-core'
import { RequestInterceptor } from 'ask-sdk-runtime'
import {
    isSkillEvent,
    getPersistentAttributes,
    updateSessionAttributes
} from 'ask-utils'
import moment from 'moment'

export const SetLaunchCountInterceptor: RequestInterceptor<HandlerInput> = {
    async process (input: HandlerInput) {
        if (isSkillEvent(input.requestEnvelope)) return
        if (!isNewSession(input.requestEnvelope)) return
        const defaultState = {
            launchCount: 0,
            lastLaunch: undefined
        }
        const data = await getPersistentAttributes<{
            launchCount: number;
            lastLaunch?: number;
        }>(input, defaultState)
        updateSessionAttributes(input, data)
        input.attributesManager.setPersistentAttributes({
            ...data,
            launchCount: data.launchCount + 1,
            lastLaunch: moment().unix()
        })
        await input.attributesManager.savePersistentAttributes()
    }
}
export default SetLaunchCountInterceptor
