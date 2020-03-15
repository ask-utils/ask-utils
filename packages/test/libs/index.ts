/* eslint-disable */
import {
    HandlerInput, AttributesManagerFactory, ResponseFactory, PersistenceAdapter
} from 'ask-sdk-core'
import {
    services as coreService,
    Request,
    Context,
    Session
} from 'ask-sdk-core/node_modules/ask-sdk-model'
import {
    RequestEnvelope
    // services
} from 'ask-sdk-model'

import ServiceClientFactory = coreService.ServiceClientFactory // services.ServiceClientFactory;
import ApiClient = coreService.ApiClient;

const requestVersion = '1.0' as const
const baseContext: Context = {
    'System': {
        'application': {
            'applicationId': 'amzn1.ask.skill.a54bba8a-0539-4ac1-98d6-7598001808d9'
        },
        'user': {
            'userId': 'amzn1.ask.account.AEWMHEPOYNZ4JD6BSRNKWWGVS4NUCL3NOL7FQVI75O7RFE3GA62VGTYE2RPLQ3YG2SQABTIKONOLTEMK5DRHKQE2PVNJOIARPT6LWGQ65LIBFK4TK6JWVAO5TYWNYUG72A4WZBWSGLEN5RXHTLHIA2BCFCUMRFS2CDFMQ4N6SF2UVHRSTAPVHUFGO6Z4S2RTVWPQTRD73I4FSTY'
        },
        'device': {
            'deviceId': 'amzn1.ask.device.AH27Q2U4QW5DQ6ZQMZ34WWNQTKVJ3ZILL6GUCND6PV2ZZHEMMIIFMCDWTSXINJYPBOESM5ERNFHXH5O7IC44ALBYSMG7ND5KEC3WHHN66SAG6HRWDJZT2EKVDTIDWFI3QXVC2INTSWPVBSEG3FMMSU6ZUZSA',
            'supportedInterfaces': {}
        },
        'apiEndpoint': 'https://api.amazonalexa.com',
        'apiAccessToken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJodHRwczovL2FwaS5hbWF6b25hbGV4YS5jb20iLCJpc3MiOiJBbGV4YVNraWxsS2l0Iiwic3ViIjoiYW16bjEuYXNrLnNraWxsLmE1NGJiYThhLTA1MzktNGFjMS05OGQ2LTc1OTgwMDE4MDhkOSIsImV4cCI6MTU4NDI1NTI1OSwiaWF0IjoxNTg0MjU0OTU5LCJuYmYiOjE1ODQyNTQ5NTksInByaXZhdGVDbGFpbXMiOnsiY29udGV4dCI6IkFBQUFBQUFBQUFES3R2NG5VT1B4QzhTS2ZudWpKaGUwSkFFQUFBQUFBQUJnUlZwekk2Z1UrSmM1QWd0eTFZd2RGU2k0czBLQVlFSHNBY3hXUHZET294eHdQT1RiQmR2akNpK1g5UWVWUzZXS2E4eE5ITWQxWTFDOCtZVjhhMmFCS0VtSDNQOUw1b0phY3ZvVzd4NHdkcUhLWXcxeWQ5ME5YVEdNOFQ5QkFFYThqbWlrSTg1eGhrUStUMmdhVm96L09uQ3diYUtmMCtFZHZlU29RWHpIWjV4eVVKeUVic1gvekhSSGV4NTJiOFF2bi9xTVgyZlhJNU4vUFZMdVRYRzNuMTc0Ym1pTzN6d0FmaXJHR29iNUFWMitNUlpPTHFPKzJxblpFcU1wc1luaUVuWFFaWGJ0QWhyWnkraTN1N3VtamRlZ0tlSUY2YmRXSDZWMFJ3S01OODRpNndFaHJuQVpSeTRIdkRjZy9COXJnUlV3YTg1eGZVL09qZHJzV2I5QWFESjRLS0s4dTBoMGUyKzRrYlRJdzNobXdKc0IvNEJjL0RmQmJoUmhFYjVXVldIbyIsImNvbnNlbnRUb2tlbiI6bnVsbCwiZGV2aWNlSWQiOiJhbXpuMS5hc2suZGV2aWNlLkFIMjdRMlU0UVc1RFE2WlFNWjM0V1dOUVRLVkozWklMTDZHVUNORDZQVjJaWkhFTU1JSUZNQ0RXVFNYSU5KWVBCT0VTTTVFUk5GSFhINU83SUM0NEFMQllTTUc3TkQ1S0VDM1dISE42NlNBRzZIUldESlpUMkVLVkRUSURXRkkzUVhWQzJJTlRTV1BWQlNFRzNGTU1TVTZaVVpTQSIsInVzZXJJZCI6ImFtem4xLmFzay5hY2NvdW50LkFFV01IRVBPWU5aNEpENkJTUk5LV1dHVlM0TlVDTDNOT0w3RlFWSTc1TzdSRkUzR0E2MlZHVFlFMlJQTFEzWUcyU1FBQlRJS09OT0xURU1LNURSSEtRRTJQVk5KT0lBUlBUNkxXR1E2NUxJQkZLNFRLNkpXVkFPNVRZV05ZVUc3MkE0V1pCV1NHTEVONVJYSFRMSElBMkJDRkNVTVJGUzJDREZNUTRONlNGMlVWSFJTVEFQVkhVRkdPNlo0UzJSVFZXUFFUUkQ3M0k0RlNUWSJ9fQ.R2vdIc7G214nYEtSlUHXUQqT0WhpjNepsk3UY6BCr_agttTyiwoO_XM0z-UVyRN8Myvui_EkHZuKkswK_qQzasPx-vJOM5CskN8ci-yOH_BiFFb8XAw2BUmFK-lhmKdPyAPYG7RVGqCylyrCUI8lDWBuKMLj83z5DkTd8EPVMm2cUNtR8bXt_Vso1at97g2hhgIU8_FpGW-Dwernt_RePsquFbqM-XplXNze_uGFlgbRC4ys4Vx9bWuaZhwdzTjQbjxmw3y7kyYgYg1mZUYOVRfE6sja2XKi6nkfD1D9V8vAh24FQDXdD1CCl5q-KQWpFbV003Z3XGewDjVQWObO7A'
    },
    'Viewport': {
        'experiences': [
            {
                'arcMinuteWidth': 246,
                'arcMinuteHeight': 144,
                'canRotate': false,
                'canResize': false
            }
        ],
        'shape': 'RECTANGLE',
        'pixelWidth': 1024,
        'pixelHeight': 600,
        'dpi': 160,
        'currentPixelWidth': 1024,
        'currentPixelHeight': 600,
        'touch': [
            'SINGLE'
        ],
        'video': {
            'codecs': [
                'H_264_42',
                'H_264_41'
            ]
        }
    }
    /*
    "Viewports": [
        {
            "type": "APL",
            "id": "main",
            "shape": "RECTANGLE",
            "dpi": 160,
            "presentationType": "STANDARD",
            "canRotate": false,
            "configuration": {
                "current": {
                    "video": {
                        "codecs": [
                            "H_264_42",
                            "H_264_41"
                        ]
                    },
                    "size": {
                        "type": "DISCRETE",
                        "pixelWidth": 1024,
                        "pixelHeight": 600
                    }
                }
            }
        }
    ]
    */
}
const baseSession: Session = {
    'new': true,
    'sessionId': 'amzn1.echo-api.session.832aefe0-c712-431e-b48e-a9a3526f0e43',
    'application': {
        'applicationId': 'amzn1.ask.skill.a54bba8a-0539-4ac1-98d6-7598001808d9'
    },
    'user': {
        'userId': 'amzn1.ask.account.AEWMHEPOYNZ4JD6BSRNKWWGVS4NUCL3NOL7FQVI75O7RFE3GA62VGTYE2RPLQ3YG2SQABTIKONOLTEMK5DRHKQE2PVNJOIARPT6LWGQ65LIBFK4TK6JWVAO5TYWNYUG72A4WZBWSGLEN5RXHTLHIA2BCFCUMRFS2CDFMQ4N6SF2UVHRSTAPVHUFGO6Z4S2RTVWPQTRD73I4FSTY'
    }
}

const baseRequest: Request = {
    'type': 'LaunchRequest',
    'requestId': 'amzn1.echo-api.request.44f32f01-e014-4508-a120-7f8611d923ec',
    'timestamp': '2020-03-15T06:49:19Z',
    'locale': 'ja-JP'
    // "shouldLinkResultBeReturned": false
}

class HandlerInputFactory {
    protected RequestEnvelopeFactory: RequestEnvelopeFactory = new RequestEnvelopeFactory();
    protected persistenceAdapter?: PersistenceAdapter;
    protected apiClient?: ApiClient;
    public setPersistanceAdapter (adapter: PersistenceAdapter): this {
        this.persistenceAdapter = adapter
        return this
    }
    public setApiClient (client: ApiClient): this {
        this.apiClient = client
        return this
    }
    public setRequest (request: RequestEnvelope): this {
        this.RequestEnvelopeFactory.putRequest(request)
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

class RequestEnvelopeFactory {
    private request: Request = baseRequest
    private session?: Session = baseSession;
    private context: Context = baseContext;
    private version: string = requestVersion;

    public putRequest ({ session, context, version, request }: RequestEnvelope): this {
        this.request = request
        this.session = session
        this.context = context
        this.version = version
        return this
    }

    public getRequest (): RequestEnvelope {
        return {
            request: this.request,
            session: this.session,
            context: this.context,
            version: this.version
        }
    }
}
