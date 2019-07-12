import axios, { AxiosRequestConfig } from 'axios'
import { getLocale, getApiAccessToken } from 'ask-sdk-core'
import { RequestEnvelope } from 'ask-sdk-model'
type Method = 'GET' | 'PUT' | 'POST' | 'DELETE'
export abstract class APIClient {
    protected token: string
    protected locale: string
    protected endpoint: string
    protected path: string = ''
    protected isDebug: boolean
    public constructor (requestEnvelope: RequestEnvelope, isDebug: boolean = true) {
        this.token = getApiAccessToken(requestEnvelope)
        this.locale = getLocale(requestEnvelope)
        this.endpoint = requestEnvelope.context.System.apiEndpoint
        this.isDebug = isDebug
    }
    protected getURL (path?: string): string {
        const p = `/${this.path}${path ? `/${path}` : ''}`
        const url = `${this.endpoint}${p.replace(/\/\//g, '/')}`
        return url
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected createAxiosRequestObject (method: Method, path?: string, data?: any): AxiosRequestConfig {
        const conf: AxiosRequestConfig = {
            method: method,
            url: this.getURL(path),
            headers: {
                'Content-type': 'application/json',
                'Accept-Language': this.locale,
                'Authorization': `Bearer ${this.token}`
            }
        }
        if (data) conf.data = data
        return conf
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected async delete (path?: string): Promise<any> {
        const param = this.createAxiosRequestObject('DELETE', path)
        if (this.isDebug) console.log('[Request] %j', param)
        const { data } = await axios(param)
        if (this.isDebug) console.log('[Response] %j', data)
        return data
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected async get (path?: string): Promise<any> {
        const param = this.createAxiosRequestObject('GET', path)
        if (this.isDebug) console.log('[Request] %j', param)
        const { data } = await axios(param)
        if (this.isDebug) console.log('[Response] %j', data)
        return data
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected async post (body?: any, path?: string): Promise<any> {
        const param = this.createAxiosRequestObject('POST', path, body)
        if (this.isDebug) console.log('[Request] %j', param)
        const { data } = await axios(param)
        if (this.isDebug) console.log('[Response] %j', data)
        return data
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected async put (body?: any, path?: string): Promise<any> {
        const param = this.createAxiosRequestObject('PUT', path, body)
        if (this.isDebug) console.log('[Request] %j', param)
        const { data } = await axios(param)
        if (this.isDebug) console.log('[Response] %j', data)
        return data
    }
}
export default APIClient
