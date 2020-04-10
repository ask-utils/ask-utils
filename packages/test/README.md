# Testing utilities
[![npm version](https://badge.fury.io/js/%40ask-utils%2Frouter.svg)](https://badge.fury.io/js/%40ask-utils%2Frouter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Maintainability](https://api.codeclimate.com/v1/badges/c17851759423ce151b9e/maintainability)](https://codeclimate.com/github/ask-utils/ask-utils/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c17851759423ce151b9e/test_coverage)](https://codeclimate.com/github/ask-utils/ask-utils/test_coverage)
[![Build Status](https://travis-ci.org/ask-utils/ask-utils.svg?branch=master)](https://travis-ci.org/ask-utils/ask-utils)
![logo](https://ask-utils.dev/static/9cbabc261164aba75a5d7e32d0e53371/8a651/youtube_profile_image.png)

https://ask-utils.dev

Simple testing utilities for ask-sdk.

## Getting started

```
$ npm i -S @ask-utils/test
```

## Basic Usage

### RequestEnvelope
```typescript
import {
    RequestEnvelopeFactory,
    RequestFactory,
} from '@ask-utils/test'

const requestEnvelope = new RequestEnvelopeFactory(
  new RequestFactory('LaunchRequest')
).getRequest()

{
  "request": {
    "timestamp": "2020-04-10T16:52:00Z",
    "locale": "en-US",
    "requestId": "amzn1.echo-external.request.ca4e7a21-7cee-4f9e-b03d-b9b589b237a1",
    "type": "LaunchRequest"
  },
  "session": {
    "new": true,
    "sessionId": "SessionID.a18a82f9-cd07-4429-b7a8-50e19adfb2b6",
    "application": {
      "applicationId": "amzn1.echo-sdk-ams.app.f1d2b8c6-6884-4c37-807b-e02b7ffcd332"
    },
    "user": {
      "userId": "amzn1.ask.account.98db37a6-f8aa-494a-8598-490b9528c68f"
    }
  },
  "context": {
    "System": {
      "application": {
        "applicationId": "amzn1.echo-sdk-ams.app.f1d2b8c6-6884-4c37-807b-e02b7ffcd332"
      },
      "user": {
        "userId": "amzn1.ask.account.98db37a6-f8aa-494a-8598-490b9528c68f"
      },
      "apiEndpoint": "https://api.amazonalexa.com",
      "apiAccessToken": "token"
    }
  },
  "version": "1.0"
}

```

### HandlerInput

```typescript
import {
    HandlerInputFactory,
    RequestEnvelopeFactory,
    LaunchRequestFactory
} from '@ask-utils/test'
const HandlerInput = new HandlerInputFactory(
    new RequestEnvelopeFactory(
      new LaunchRequestFactory()
    )
)
const handlerInput = HandlerInput.create()
{
  "requestEnvelope": {
    "request": {
      "timestamp": "2020-04-10T16:57:42Z",
      "locale": "en-US",
      "requestId": "amzn1.echo-external.request.e0c9fbd4-7bbd-4048-89da-ba270bbafabf",
      "type": "LaunchRequest"
    },
    "session": {
      "new": true,
      "sessionId": "SessionID.f237b19f-0561-4c0a-a9c7-e3621bfd7c81",
      "application": {
        "applicationId": "amzn1.echo-sdk-ams.app.de4bde98-5979-4d38-81f7-e8859d1df904"
      },
      "user": {
        "userId": "amzn1.ask.account.69cde737-db93-4a47-b8f5-37eb3ddf81c9"
      }
    },
    "context": {
      "System": {
        "application": {
          "applicationId": "amzn1.echo-sdk-ams.app.de4bde98-5979-4d38-81f7-e8859d1df904"
        },
        "user": {
          "userId": "amzn1.ask.account.69cde737-db93-4a47-b8f5-37eb3ddf81c9"
        },
        "apiEndpoint": "https://api.amazonalexa.com",
        "apiAccessToken": "token"
      }
    },
    "version": "1.0"
  },
  "attributesManager": {},
  "responseBuilder": {}
}

```

## Custom Usage

### RequestEnvelope
#### IntentRequest with Slot and sessionAttributes

```typescript
import {
    RequestEnvelopeFactory,
    RequestFactory,
    SessionFactory,
    ContextFactory,
    IntentRequestFactory
} from '@ask-utils/test'

const factory = new RequestEnvelopeFactory(
    new IntentRequestFactory('ja-JP'),
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

console.log(factory.getRequest())
{
  "request": {
    "timestamp": "2020-04-10T16:56:09Z",
    "locale": "en-US",
    "requestId": "amzn1.echo-external.request.3fa05ce2-f3de-4a47-90c1-5029893895e6",
    "type": "LaunchRequest"
  },
  "session": {
    "new": true,
    "sessionId": "SessionID.76b1f445-0ac4-41dd-9192-de92e23721cf",
    "application": {
      "applicationId": "amzn1.echo-sdk-ams.app.baa806b2-af37-4e22-8cc8-893f411cb0a4"
    },
    "user": {
      "userId": "amzn1.ask.account.a3ba37ae-3fc7-47e9-aa5e-7bdd6c4a7516"
    }
  },
  "context": {
    "System": {
      "application": {
        "applicationId": "amzn1.echo-sdk-ams.app.baa806b2-af37-4e22-8cc8-893f411cb0a4"
      },
      "user": {
        "userId": "amzn1.ask.account.a3ba37ae-3fc7-47e9-aa5e-7bdd6c4a7516"
      },
      "apiEndpoint": "https://api.amazonalexa.com",
      "apiAccessToken": "token"
    }
  },
  "version": "1.0"
}

```

### HandlerInput
#### With SessionAttributes
```typescript
import {
    HandlerInputFactory,
    RequestEnvelopeFactory,
    LaunchRequestFactory
} from '@ask-utils/test'

const request = new LaunchRequestFactory()
const requestEnvelope = new RequestEnvelopeFactory(request)
requestEnvelope.session.putAttributes({
    name: 'hello',
    label: 123
})
const HandlerInput = new HandlerInputFactory(requestEnvelope)
const handlerInput = HandlerInput.create()

{
  "requestEnvelope": {
    "request": {
      "timestamp": "2020-04-10T16:59:58Z",
      "locale": "en-US",
      "requestId": "amzn1.echo-external.request.245753fb-78d9-47bf-9cd6-5334c5436df7",
      "type": "LaunchRequest"
    },
    "session": {
      "new": true,
      "sessionId": "SessionID.c730169a-8593-4986-a0db-7574f044727f",
      "application": {
        "applicationId": "amzn1.echo-sdk-ams.app.eec5bb0c-4fbd-4208-b9c3-2c5370a7d5e4"
      },
      "user": {
        "userId": "amzn1.ask.account.8c9bebf8-7f8b-4139-b91e-28e806a81e71"
      },
      "attributes": {
        "name": "hello",
        "label": 123
      }
    },
    "context": {
      "System": {
        "application": {
          "applicationId": "amzn1.echo-sdk-ams.app.eec5bb0c-4fbd-4208-b9c3-2c5370a7d5e4"
        },
        "user": {
          "userId": "amzn1.ask.account.8c9bebf8-7f8b-4139-b91e-28e806a81e71"
        },
        "apiEndpoint": "https://api.amazonalexa.com",
        "apiAccessToken": "token"
      }
    },
    "version": "1.0"
  },
  "attributesManager": {},
  "responseBuilder": {}
}

```