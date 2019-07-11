# ASK Utils for Error Handler

## Getting started

```
$ npm i -S @ask-utils/error-handlers
```

## Requirement
You `SHOULD` set the environment variable in your env (Lambda, Container, etc..)

```
SENTRY_DNS=YOUR_SENTRY_DNS
```

## Basic Usage

```typescript
import Alexa from 'ask-sdk'
import { SetErrorTrackerInterceptor, SentryDefaultErrorHandler } from '@ask-utils/error-handlers'

export const handler = Alexa.SkillBuilders.standard()
            .addErrorHandlers(SentryDefaultErrorHandler)
            .addRequestInterceptors(SetErrorTrackerInterceptor)
            .lambda()
```

## Custom Usage

```typescript
const ErrorHandler = SentryErrorHandlerFactory.init()
        .setHandle((handlerInput, error) => {
          console.log('Stack: %j', error.stack)
          return handlerInput.responseBuilder
            .speak('Sorry I could not understand the meaning. Please tell me again')
            .reprompt('Could you tell me onece more?')
            .getResponse()
        })
        .getHandler()
```