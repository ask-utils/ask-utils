import { RequestEnvelope } from 'ask-sdk-model'

export interface UserActivityAdapter {
    trackSkillInvocation(request: RequestEnvelope): Promise<void> | void;
}

export interface UserActivityConfig {
    /**
     * The days of the churned user
     * If set 3, when the user invoke the skill after last invocation more than 4 days,
     * the user marked asa a returned user
     */
    returnedUserDays: number;
}

export interface UserActivity {
    invocationNumber: number;
    lastInvocationTime: number;
}
