import axios, { AxiosRequestConfig } from 'axios'
import moment from 'moment'
import uuid from 'uuid'
import {
    event,
    client
} from './model'

export const getApiURL = (config: client.ClientConfig): client.APIEndpoint => {
    if (config.apiEndpont) return config.apiEndpont
    switch (config.apiRegion) {
        case 'FE':
            return 'https://api.fe.amazonalexa.com/v1/proactiveEvents/'
        case 'EU':
            return 'https://api.eu.amazonalexa.com/v1/proactiveEvents/'
        case 'US':
        default:
            return 'https://api.amazonalexa.com/v1/proactiveEvents/'
    }
}

export const getApiEndpoint = (config: client.ClientConfig): client.APIEndpoint => {
    const url = getApiURL(config)
    if (!config.isProduction) return `${url}stages/development` as client.DevAPIURL
    return url
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAuthResponse = (res: any): res is client.AuthResponse => {
    if (!res) return false
    if (!res.access_token || !res.expires_in || !res.scope || !res.token_type) return false
    return true
}

export default class ProactiveClient {
    protected clientId: client.ClientId
    protected clientSecret: client.ClientSecret
    protected apiEndpoint: client.APIEndpoint
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private body: any = {}

    public constructor (config: client.ClientConfig) {
        this.clientId = config.clientId
        this.clientSecret = config.clientSecret
        this.apiEndpoint = getApiEndpoint(config)
        this.body = {
            timestamp: moment().toISOString(),
            expiryTime: moment().add(1, 'days').toISOString(),
            event: {},
            relevantAudience: 'Multicast',
            referenceId: uuid.v4()
        }
        return this
    }
    public getReferenceId (): string {
        return this.body.referenceId
    }
    public updateReferenceId (id: string): this{
        this.body.referenceId = id
        return this
    }
    public async getAccessToken (): Promise<client.AuthResponse> {
        const response = await axios({
            method: 'POST',
            url: 'https://api.amazon.com/auth/O2/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: [
                'scope=alexa::proactive_events',
                'grant_type=client_credentials',
                `client_id=${this.clientId}`,
                `client_secret=${this.clientSecret}`
            ].join('&')
        })
        if (!isAuthResponse(response.data)) throw new Error('failed to get access token')
        return response.data
    }
    public setReferenceId (id: string): this {
        this.body.referenceId = id
        return this
    }
    public setTimestamp (date: Date): this {
        this.body.timestamp = moment(date).toISOString()
        return this
    }
    public setExpiryTime (date: Date): this {
        this.body.expiryTime = moment(date).toISOString()
        return this
    }
    public setEvent (event: event.Props): this {
        this.body.event = event
        return this
    }
    public setPayload (payload: event.Payload): this {
        this.body.event.payload = payload
        return this
    }
    public setEventName (name: event.EventName): this {
        this.body.event.name = name
        return this
    }
    public setLocalizedAttributes (localizedAttributes: {}[]): this {
        this.body.localizedAttributes = localizedAttributes
        return this
    }
    public setRelevantAudience (type: client.AudienceType, payload?: client.AudiencePayload): this {
        const relevantAudience: client.RelevantAudience = {
            type
        }
        if (type === 'Unicast') relevantAudience.payload = payload
        this.body.relevantAudience = relevantAudience
        return this
    }
    public getBody (): client.RequstBody {
        return this.body
    }
    public getRequestParams (accessToken: string): AxiosRequestConfig {
        return {
            method: 'POST',
            url: this.apiEndpoint,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: this.getBody()
        }
    }
    public async requestEvent (): Promise<client.Response> {
        const authResult = await this.getAccessToken()
        if (!authResult.access_token) throw new Error('missing access_token')
        const param = this.getRequestParams(authResult.access_token)
        try {
            const response = await axios(param)
            return {
                statusCode: response.status,
                message: response.statusText,
                request: this.getBody()
            }
        } catch (e) {
            if (!e.response) throw e
            const err = {
                statusCode: 500,
                errorCode: 'Error',
                message: 'Internal Error'
            }
            if (e.response.data && e.response.data.message) err.message = e.response.data.message
            if (e.response.status) err.statusCode = e.response.status
            if (e.response.statusText) err.errorCode = e.response.statusText
            throw err
        }
    }
}
