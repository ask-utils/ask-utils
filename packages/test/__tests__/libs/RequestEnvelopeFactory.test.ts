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
    it('should create update attribute updator directry', () => {
        const factory = new RequestEnvelopeFactory(
            new RequestFactory('Reminders.ReminderCreated')
        )
        factory.applicationId = 'application.ID'
        factory.userId = 'user.ID'
        factory.sessionId = 'session.ID'
        factory.requestId = 'request.ID'
        factory.requestDate = new Date(2020, 0, 1, 15, 22, 30)
        expect(factory.getRequest()).toMatchObject({
            'context': {
                'System': {
                    'apiAccessToken': 'token',
                    'apiEndpoint': 'https://api.amazonalexa.com',
                    'application': {
                        'applicationId': 'application.ID'
                    },
                    'user': {
                        'userId': 'user.ID'
                    }
                }
            },
            'request': {
                'locale': 'en-US',
                'requestId': 'request.ID',
                'timestamp': '2020-01-01T06:22:30Z',
                'type': 'Reminders.ReminderCreated'
            },
            'session': {
                'application': {
                    'applicationId': 'application.ID'
                },
                'new': true,
                'sessionId': 'session.ID',
                'user': {
                    'userId': 'user.ID'
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
