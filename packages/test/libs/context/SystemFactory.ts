import {
    interfaces,
    Permissions,
    User,
    SupportedInterfaces
} from 'ask-sdk-core/node_modules/ask-sdk-model'
import { v4 as uuid } from 'uuid'
import System = interfaces.system.SystemState

/**
 * Skill request context (system factory)
 */
export class SystemFactory {
    /**
     * Default object
     */
    private system: System = {
        application: {
            applicationId: 'amzn1.echo-sdk-ams.app.' + uuid()
        },
        user: {
            userId: 'amzn1.ask.account.' + uuid()
        },
        apiEndpoint: 'https://api.amazonalexa.com'
    }

    /**
     * Put the application id
     * @param id
     */
    public putApplicationId (id: string): this {
        this.system.application.applicationId = id
        return this
    }

    /**
     * Put skill user attributes
     * @param id
     * @param acccessToken
     * @param permissions
     */
    public putUser (id: string, acccessToken?: string, permissions?: Permissions): this {
        const user: User = {
            userId: id
        }
        if (acccessToken) user.accessToken = acccessToken
        if (permissions) user.permissions = permissions
        this.system.user = user
        return this
    }

    /**
     * Put execution device attributes
     * @param id
     * @param supportedInterfaces
     */
    public putDevice (id: string, supportedInterfaces: SupportedInterfaces): this {
        this.system.device = {
            deviceId: id,
            supportedInterfaces
        }
        return this
    }

    /**
     * Put api endpoint url fo ASK API
     * @param endpoint
     */
    public putApiEndpoint (endpoint: string): this {
        this.system.apiEndpoint = endpoint
        return this
    }

    /**
     * Put api access token for ASK API
     * @param token
     */
    public putApiAccessToken (token: string): this {
        this.system.apiAccessToken = token
        return this
    }

    /**
     * Put execution person attributes
     * @param id
     * @param accessToken
     */
    public putPerson (id: string, accessToken?: string): this {
        this.system.person = {
            personId: id,
            accessToken
        }
        return this
    }

    /**
     * Get attributes
     */
    public getSystem (): System {
        return this.system
    }
}
