import { RequestEnvelope, Context, ResponseEnvelope, services } from 'ask-sdk-model';
import { TLogLevelName } from 'tslog';

/**
 * Skill working stage
 */
export type SkillStage = 'development' | 'test' | 'production';

/**
 * Database (PersistanceAdapter) configs
 */
export type TalkyJSDBonfig = {
    type: 'none' | 's3' | 'dynamodb'
    tableName: string;
    /**
     * DynamoDB options
     */
    withCreateTable?: boolean;
    /**
     * S3 options
     */
    s3PathPrefix?: string;
}

/**
 * API service client configurations
 */
export type TalkyJSAPIClientConfig = {
    useDefault: boolean;
    client?: services.ApiClient;
}

/**
 * Skill factory config
 */
export type TalkyJSSkillConfig = {
    stage?: SkillStage;
    logLevel?: TLogLevelName;
    database?: TalkyJSDBonfig;
    skillId?: string;
    apiClient?: TalkyJSAPIClientConfig;
}

/**
 * Native Lambda handler for Alexa Custom skill
 */
export type SkillHandler = (event: RequestEnvelope, context?: Context) => Promise<ResponseEnvelope>
