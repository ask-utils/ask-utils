# Router
[![npm version](https://badge.fury.io/js/%40ask-utils%2Frouter.svg)](https://badge.fury.io/js/%40ask-utils%2Frouter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Maintainability](https://api.codeclimate.com/v1/badges/c17851759423ce151b9e/maintainability)](https://codeclimate.com/github/ask-utils/ask-utils/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c17851759423ce151b9e/test_coverage)](https://codeclimate.com/github/ask-utils/ask-utils/test_coverage)
[![Build Status](https://travis-ci.org/ask-utils/ask-utils.svg?branch=master)](https://travis-ci.org/ask-utils/ask-utils)
![logo](https://ask-utils.dev/static/9cbabc261164aba75a5d7e32d0e53371/8a651/youtube_profile_image.png)

https://ask-utils.dev

Simple skill handler routing libs.

## Getting started

```
$ npm i -S @ask-utils/router
```

## Basic Usage

```typescript

import {
    RequestHandlerFactory
} from '@ask-utils/router'
const router = new RequestHandlerFactory()
router.addRoutes({
    requestType: 'LaunchRequest',
    handler: (input) => {
        return input.responseBuilder
            .speak('hello world').getResponse()
    }
}, {
    requestType: 'IntentRequest',
    intentName: 'HelloIntent',
    handler: (input, helpers) => {
        helpers.stateManager.setState('step1')
        return input.responseBuilder
        .speak('Go to step 1').reprompt('will you go?').getResponse()
    }
}, {
    requestType: 'IntentRequest',
    intentName: 'Step1Intent',
    situation: {
        state: {
            current: 'step1',
            next: 'step2'
        }
    },
    handler: (input) => {
        return input.responseBuilder
        .speak('Go to step 2').reprompt('will you go?').getResponse()
    }
}, {
    requestType: 'IntentRequest',
    intentName: 'Step2Intent',
    situation: {
        state: {
            current: 'step2',
            next: 'end'
        }
    },
    handler: (input) => {
        return input.responseBuilder
        .speak('Finnaly').reprompt('will you go?').getResponse()
    }
}, {
    requestType: 'IntentRequest',
    intentName: 'AMAZON.StopIntent',
    situation: {
        shouldEndSession: true
    },
    handler: (input) => {
        return input.responseBuilder
        .speak('Bye!').getResponse()
    }
})

export const handler = CustomSkillFactory.init()
    .addRequestHandlers(
        ...router.createHandlers()
    ).lambda()
```