import {
    SkillBuilders,
    DefaultApiClient,
    CustomSkillBuilder
} from 'ask-sdk'
import { S3PersistenceAdapter } from 'ask-sdk-s3-persistence-adapter'
import { DynamoDbPersistenceAdapter } from 'ask-sdk-dynamodb-persistence-adapter'
import {
    RecordTheResponseInterceptor,
    RepeatIntent,
    SetLaunchCountInterceptor,
    SessionEndedRequestHandler,
    DeleteDisabledUserHandler,
    ConstantsInterceptorFactory,
    SkillConstants
} from '@ask-utils/handlers'
import {
    RequestLogger,
    ResponseLogger
} from '@ask-utils/core'
import {
    ISPHandlers,
    altLoadISPDataInterceptor
} from '@ask-utils/isp'

import {
    SkillConfig,
    S3SkillConfig,
    DynamoDBSkillConfig,
    SkillHandlers
} from './models'

const isS3Skill = (config: SkillConfig): config is S3SkillConfig => {
    return config.persistanceType === 'S3'
}
const isDynamoDBSkill = (config: SkillConfig): config is DynamoDBSkillConfig => {
    return config.persistanceType === 'DynamoDB'
}

export const createSkill = <T extends SkillConstants = SkillConstants>(config: SkillConfig<T>, handlers: SkillHandlers): CustomSkillBuilder => {
    const skill = SkillBuilders.custom().withApiClient(new DefaultApiClient())
    if (isS3Skill(config)) {
        skill.withPersistenceAdapter(
            new S3PersistenceAdapter({
                bucketName: config.bucketName,
                pathPrefix: config.bucketPathPrefix
            })
        )
    } else if (isDynamoDBSkill(config)) {
        skill.withPersistenceAdapter(
            new DynamoDbPersistenceAdapter({
                tableName: config.tableName
            })
        )
    }

    const { requestHandlers, errorHandlers, requestInterceptors, responseInterceptors } = handlers
    skill.addRequestHandlers(
        ...requestHandlers
    ).addRequestInterceptors(
        RequestLogger,
        SetLaunchCountInterceptor
    ).addResponseInterceptors(
        RecordTheResponseInterceptor,
        ResponseLogger
    )
    if (config.constants) {
        const ConstantsInterceptor = ConstantsInterceptorFactory.init<T>(config.constants)
        skill.addRequestInterceptors(ConstantsInterceptor)
    }

    if (config.isISP) {
        skill.addRequestHandlers(...ISPHandlers)
            .addRequestInterceptors(altLoadISPDataInterceptor)
    }

    skill.addRequestHandlers(
        RepeatIntent,
        DeleteDisabledUserHandler,
        SessionEndedRequestHandler
    )
    if (requestInterceptors) skill.addRequestInterceptors(...requestInterceptors)
    if (responseInterceptors) skill.addResponseInterceptors(...responseInterceptors)
    if (errorHandlers) skill.addErrorHandlers(...errorHandlers)
    return skill
}
