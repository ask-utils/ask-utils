
/* eslint-disable */
import {
    HandlerInput, AttributesManagerFactory, ResponseFactory, PersistenceAdapter
} from 'ask-sdk-core'
import {
    services as coreService,
} from 'ask-sdk-model' //'ask-sdk-model' // 'ask-sdk-core/node_modules/ask-sdk-model'
import {
    RequestEnvelope
    // services
} from 'ask-sdk-model'
import { RequestEnvelopeFactory } from '../RequestEnvelopeFactory';

import ServiceClientFactory = coreService.ServiceClientFactory // services.ServiceClientFactory;
import ApiClient = coreService.ApiClient;

export class HandlerInputFactory {
    protected RequestEnvelopeFactory: RequestEnvelopeFactory;
    protected persistenceAdapter?: PersistenceAdapter;
    protected apiClient?: ApiClient;
    public constructor(requestEnvelopeFactory: RequestEnvelopeFactory) {
        this.RequestEnvelopeFactory = requestEnvelopeFactory
    }

    public setPersistanceAdapter (adapter: PersistenceAdapter): this {
        this.persistenceAdapter = adapter
        return this
    }
    public setApiClient (client: ApiClient): this {
        this.apiClient = client
        return this
    }
    public updateRequest (requestEnvelope: RequestEnvelope): this {
        const {
            request,
            session,
            context,
        } = requestEnvelope
        this.RequestEnvelopeFactory.request.putRequest(request)
        if (session) this.RequestEnvelopeFactory.session.putSession(session)
        this.RequestEnvelopeFactory.context.putContext(context)
        return this
    }
    private getServiceClientFactory (): ServiceClientFactory | undefined {
        const { apiClient } = this
        const requestEnvelope = this.RequestEnvelopeFactory.getRequest()
        const { apiAccessToken, apiEndpoint } = requestEnvelope.context.System
        if (!apiClient || !apiAccessToken) return undefined
        return new ServiceClientFactory({
            apiClient: apiClient,
            apiEndpoint: apiEndpoint,
            authorizationValue: apiAccessToken
        })
    }
    public create (context?: any): HandlerInput {
        const requestEnvelope = this.RequestEnvelopeFactory.getRequest()
        const input: HandlerInput = {
            requestEnvelope,
            context,
            attributesManager: AttributesManagerFactory.init({
                requestEnvelope,
                persistenceAdapter: this.persistenceAdapter
            }),
            responseBuilder: ResponseFactory.init(),
            serviceClientFactory: this.getServiceClientFactory()
        }
        return input
    }
}
