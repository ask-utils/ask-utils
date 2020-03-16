import {
    interfaces,
    User,
    Device,
    Application

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
    private system: System
    public constructor (applicationId?: string, userId?: string) {
        this.system = {
            application: {
                applicationId: applicationId || 'amzn1.echo-sdk-ams.app.' + uuid()
            },
            user: {
                userId: userId || 'amzn1.ask.account.' + uuid()
            },
            apiEndpoint: 'https://api.amazonalexa.com'
        }
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
     * Put the application
     * @param id
     */
    public putApplication (application: Application): this {
        this.system.application = application
        return this
    }

    /**
     * Put skill user attributes
     * @param id
     * @param acccessToken
     * @param permissions
     */
    public putUser (user: Partial<User>): this {
        this.system.user = Object.assign(this.system.user, user)
        return this
    }

    /**
     * Put execution device attributes
     * @param id
     * @param supportedInterfaces
     */
    public putDevice (device: Device): this {
        this.system.device = {
            ...this.system.device,
            ...device
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
