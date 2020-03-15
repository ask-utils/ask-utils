import {
	Request,
} from 'ask-sdk-core/node_modules/ask-sdk-model'
import { v4 as uuid } from 'uuid'

export class RequestFactory<T extends Request = Request> {
    protected requestID?: string;
    protected requestType: string;
	protected date: Date = new Date();
	protected locale: string;
    protected request: Partial<T> = {}
	constructor(requestType: T['type'], locale: string = 'en-US') {
		this.requestType = requestType;
        this.locale = locale;
	}

	public setRequestType(type: T['type']) {
		this.requestType = type
		return this
	}
	private getRequestType(): string {
		return this.requestType
	}

	public setRequestId(id: string) {
		this.requestID = id
		return this;
	}
	private getRequestId() {
		if (this.requestID) return this.requestID;
        return "amzn1.echo-external.request." + uuid();
	}

	public setRequestedDate(date: Date) {
		this.date = date
		return this;
	}
	private getTimestamp() {
        const timestamp = this.date.toISOString();
        return timestamp.substring(0, 19) + "Z";
	}

	public setLocale(locale: string) {
		this.locale = locale;
		return this;
	}
	private getLocale() {
		return this.locale
	}

	public putRequest(request: T) {
		this.request = request
		return this
    }
    protected updateRequest(param?: Partial<T>) {
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
	protected validateRequest(): void {
		if (!this.request) throw new Error("No request item")
	}
	public getRequest(): Request {
		this.updateRequest();
		this.validateRequest()
		return this.request as Request
	}
}
