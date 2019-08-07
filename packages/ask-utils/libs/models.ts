import {
    RequestInterceptor,
    ResponseInterceptor,
    ErrorHandler,
    RequestHandler
} from 'ask-sdk'
import {
    SkillConstants
} from '@ask-utils/handlers'

type PersistanceType = 'DynamoDB' | 'S3'
interface BaseSkillConfig<T extends SkillConstants = SkillConstants> {
    persistanceType: PersistanceType;
    isISP?: boolean;
    constants?: T;
}
export interface S3SkillConfig<T extends SkillConstants = SkillConstants> extends BaseSkillConfig<T> {
    persistanceType: 'S3';
    bucketName: string;
    bucketPathPrefix: string;
}
export interface DynamoDBSkillConfig<T extends SkillConstants = SkillConstants> extends BaseSkillConfig<T> {
    persistanceType: 'DynamoDB';
    tableName: string;
}
export type SkillConfig<T extends SkillConstants = SkillConstants> = S3SkillConfig<T> | DynamoDBSkillConfig<T>
export interface SkillHandlers {
    requestHandlers: RequestHandler[];
    requestInterceptors?: RequestInterceptor[];
    responseInterceptors?: ResponseInterceptor[];
    errorHandlers?: ErrorHandler[];
}
