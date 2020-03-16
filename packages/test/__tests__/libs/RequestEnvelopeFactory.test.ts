import {
    RequestEnvelopeFactory,
    RequestFactory,
    SessionFactory,
    ContextFactory,
    IntenthRequestFactory
} from '../../libs/index'

describe('RequestEnvelopeFactory', () => {
    it('should create request object by default', () => {
        const factory = new RequestEnvelopeFactory(
            new RequestFactory('LaunchRequest')
        )
        expect(factory.getRequest()).toMatchObject({
            'context': {
                'System': {
                    'apiAccessToken': 'token',
                    'apiEndpoint': 'https://api.amazonalexa.com',
                    'application': {
                        'applicationId': expect.any(String)
                    },
                    'user': {
                        'userId': expect.any(String)
                    }
                }
            },
            'request': {
                'locale': 'en-US',
                'requestId': expect.any(String),
                'timestamp': expect.any(String),
                'type': 'LaunchRequest'
            },
            'session': {
                'application': {
                    'applicationId': expect.any(String)
                },
                'new': true,
                'sessionId': expect.any(String),
                'user': {
                    'userId': expect.any(String)
                }
            },
            'version': '1.0'
        })
    })
    it('should create custom attributes request', () => {
        const factory = new RequestEnvelopeFactory(
            new IntenthRequestFactory('ja-JP'),
            new ContextFactory(),
            new SessionFactory()
        )
        factory.context.system.putPerson('personId', 'token')
        factory.session.isNewSession(false)
            .putAttributes({
                name: 'hello'
            })

        factory.request.setIntent({
            name: 'HelloIntent',
            slots: {
                example: {
                    name: 'Hello',
                    confirmationStatus: 'NONE'
                }
            },
            confirmationStatus: 'NONE'
        })

        expect(factory.getRequest()).toMatchObject({
            'context': {
                'System': {
                    'apiAccessToken': 'token',
                    'apiEndpoint': 'https://api.amazonalexa.com',
                    'application': {
                        'applicationId': expect.any(String)
                    },
                    'user': {
                        'userId': expect.any(String)
                    }
                }
            },
            'request': {
                'locale': 'ja-JP',
                'requestId': expect.any(String),
                'timestamp': expect.any(String),
                'type': 'IntentRequest',
                intent: {
                    name: 'HelloIntent',
                    slots: {
                        example: {
                            name: 'Hello',
                            confirmationStatus: 'NONE'
                        }
                    },

                    confirmationStatus: 'NONE'
                }
            },
            'session': {
                'application': {
                    'applicationId': expect.any(String)
                },
                'attributes': {
                    'name': 'hello'
                },
                'new': false,
                'sessionId': expect.any(String),
                'user': {
                    'userId': expect.any(String)
                }
            },
            'version': '1.0'
        })
    })
})
