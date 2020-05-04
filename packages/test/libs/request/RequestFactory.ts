import {
    Request
} from 'ask-sdk-model'// 'ask-sdk-model' // 'ask-sdk-core/node_modules/ask-sdk-model'
import { v4 as uuid } from 'uuid'

export class RequestFactory<T extends Request = Request> {
    protected requestID?: string;
    protected requestType: string;
    protected date: Date = new Date();
    protected locale: string;
    protected request: Partial<T> = {}
    public constructor (requestType: T['type'], locale: string = 'en-US') {
        this.requestType = requestType
        this.locale = locale
    }

    public setRequestType (type: T['type']): this {
        this.requestType = type
        return this
    }
    private getRequestType (): string {
        return this.requestType
    }

    public setRequestId (id: string): this {
        this.requestID = id
        return this
    }
    private getRequestId (): string {
        if (this.requestID) return this.requestID
        return 'amzn1.echo-external.request.' + uuid()
    }

    public setRequestedDate (date: Date): this {
        this.date = date
        return this
    }
    private getTimestamp (): string {
        const timestamp = this.date.toISOString()
        return timestamp.substring(0, 19) + 'Z'
    }

    public setLocale (locale: string): this {
        this.locale = locale
        return this
    }
    private getLocale (): string {
        return this.locale
    }

    public putRequest (request: T): this {
        this.request = request
        return this
    }
    protected updateRequest (param?: Partial<T>): this {
        this.request = {
            ...this.request,
            timestamp: this.getTimestamp(),
            locale: this.getLocale(),
            requestId: this.getRequestId(),
            type: this.getRequestType(),
            ...param
        }
        return this
    }
    /**
     * IF the request type has several required value, should overwrite it to test them.
     */
    protected validateRequest (): void {
        if (!this.request) throw new Error('No request item')
    }
    public getRequest (): Request {
        this.updateRequest()
        this.validateRequest()
        return this.request as Request
    }
}
