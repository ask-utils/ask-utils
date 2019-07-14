# ASK Utils for Error Handler
[![npm version](https://badge.fury.io/js/%40ask-utils%2Ferror-handlers.svg)](https://badge.fury.io/js/%40ask-utils%2Ferror-handlers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Maintainability](https://api.codeclimate.com/v1/badges/c17851759423ce151b9e/maintainability)](https://codeclimate.com/github/ask-utils/ask-utils/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c17851759423ce151b9e/test_coverage)](https://codeclimate.com/github/ask-utils/ask-utils/test_coverage)
[![Build Status](https://travis-ci.org/ask-utils/ask-utils.svg?branch=master)](https://travis-ci.org/ask-utils/ask-utils)
![logo](https://ask-utils.dev/static/9cbabc261164aba75a5d7e32d0e53371/8a651/youtube_profile_image.png)

https://ask-utils.dev
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