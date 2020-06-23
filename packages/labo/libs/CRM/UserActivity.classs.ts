import { HandlerInput, isNewSession } from 'ask-sdk-core'
import { RequestEnvelope } from 'ask-sdk-model'
import moment from 'moment'
import {
    PersistanteAttributesManager
} from '../PersistanteAttributesManager'
import { UserActivityConfig, UserActivityAdapter, UserActivity } from './UserActivity.interface'
import { getUnixTime, defaultUserActivityConfig } from './UserActivity.utils'

export class UserActivityManager extends PersistanteAttributesManager<{
    invocationNumber: number;
    lastInvocationTime: number;
}> {
    protected readonly adapter?: UserActivityAdapter
    protected readonly requestEnvelope: RequestEnvelope
    protected readonly config: UserActivityConfig
    public constructor (
        { attributesManager, requestEnvelope }: Pick<HandlerInput, 'attributesManager' | 'requestEnvelope'>,
        config: UserActivityConfig = defaultUserActivityConfig,
        adapter?: UserActivityAdapter
    ) {
        super(attributesManager)
        this.requestEnvelope = requestEnvelope
        this.adapter = adapter
        this.config = config
    }

    /**
     * Check the first skill invocation
     */
    public async isFirstSkillInvocation (): Promise<boolean> {
        const { invocationNumber } = await this.getLastActivity()
        return invocationNumber <= 1
    }

    /**
     * If the user will be returned after churning, it will be true
     */
    public async isReturnedUser (): Promise<boolean> {
        const { lastInvocationTime } = await this.getLastActivity()
        const diff = moment().diff(moment.unix(lastInvocationTime), 'days')
        return diff > this.config.returnedUserDays
    }

    /**
     * Get The user activity
     */
    public async getLastActivity (): Promise<UserActivity> {
        const data = await this.getPersistentAttributes({
            invocationNumber: 0,
            lastInvocationTime: getUnixTime()
        })
        return data
    }

    /**
     * Update skill invocation activity
     */
    public async trackSkillInvocation (): Promise<void> {
        if (!isNewSession(this.requestEnvelope)) return
        const data = await this.getLastActivity()
        data.invocationNumber = data.invocationNumber + 1
        data.lastInvocationTime = getUnixTime()

        await this.updatePersistentAttributes(data)

        /**
         * Execute additional track skill invocation event
         */
        if (this.adapter) {
            await this.adapter.trackSkillInvocation(this.requestEnvelope)
        }
    }
}
