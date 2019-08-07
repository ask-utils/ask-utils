# ASK-Utils - Utility functions for ask-sdk
[![NPM](https://nodei.co/npm/ask-utils.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ask-utils/)  
[![npm version](https://badge.fury.io/js/ask-utils.svg)](https://badge.fury.io/js/ask-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Maintainability](https://api.codeclimate.com/v1/badges/c17851759423ce151b9e/maintainability)](https://codeclimate.com/github/ask-utils/ask-utils/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c17851759423ce151b9e/test_coverage)](https://codeclimate.com/github/ask-utils/ask-utils/test_coverage)
[![Build Status](https://travis-ci.org/ask-utils/ask-utils.svg?branch=master)](https://travis-ci.org/ask-utils/ask-utils)

![logo](https://ask-utils.dev/static/9cbabc261164aba75a5d7e32d0e53371/8a651/youtube_profile_image.png)

https://ask-utils.dev

## Getting started

```
$ npm i -S ask-utils
```

## Packages

 | name | npm url | Repository | Summary | 
 | :-- | :-- | :-- | :-- |
 | @ask-utils/core | https://www.npmjs.com/package/@ask-utils/core | https://github.com/ask-utils/ask-utils/tree/master/packages/core | Core utilities | 
 | @ask-utils/proactive-event | https://www.npmjs.com/package/@ask-utils/proactive-event | https://github.com/ask-utils/ask-utils/tree/master/packages/proactive-event | Proactive Event parameter builder and request client | 
 | @ask-utils/isp | https://www.npmjs.com/package/@ask-utils/isp | https://github.com/ask-utils/ask-utils/tree/master/packages/isp | ISP helpers | 
 | @ask-utils/handlers | https://www.npmjs.com/package/@ask-utils/handlers | https://github.com/ask-utils/ask-utils/tree/master/packages/handlers | Utility handler and interceptors | 
 | @ask-utils/error-handlers | https://www.npmjs.com/package/@ask-utils/error-handlers | https://github.com/ask-utils/ask-utils/tree/master/packages/error-handlers | Error handler helpers | 
 | @ask-utils/service-client | https://www.npmjs.com/package/@ask-utils/service-client | https://github.com/ask-utils/ask-utils/tree/master/packages/serviceClient s |ServiceClient alternative | 

## Skill Builder (Beta)
We can easy to create your own skill builder

```typescript
import {
  createSkill,
  SkillHandlersFactory
} from 'ask-utils'

// can get skill constancts by request attributes
const ExampleHandler = {
  canHandle: () => true,
  handle: handlerInput => {
    const { CONSTANTS } = handlerInput.attributesManager.getRequestAttributes()
    return handlerInput.responseBuilder
      .speak(`Welcome to the ${CONSTANTS.SKILL_NAME}!`)
      .getResponse()
  }
}

const handlers = SkillHandlersFactory.create()
  .addRequestHandlers(
    LaunchRequest,
    NextIntent,
    AnswerIntent,
    YesNextIntent,
    HelpIntent,
    ResumeIntent,
    StopIntent,
    NoIntent,
    CancelIntent,
    FallBackIntent
  )
  .addRequestInterceptors(
    MyRequestInterceptor1,
    MyRequestInterceptor2,
  )
  .addResponseInterceptors(
    MyResponseInterceptor1,
    MyResponseInterceptor2,
  )
  .addErrorHandlers(
    MyErrorHandler1,
    MyErrorHandler2,
  )

export const handler = createSkill({
    persistanceType: 'S3',
    bucketName: process.env.BUCKET_NAME as string,
    bucketPathPrefix: process.env.PATH_PREFIX as string,
    isISP: true,
    constants: {
      SKILL_NAME: 'My Awesome Skill'
    }
  }, handlers.getHandlers())
  .lambda()
```

## development

```
$ git clone git@github.com:hideokamoto/ask-utils.git
$ cd ask-utils
$ yarn
$ yarn bootstrap
```

### test

```
$ npm test
```

### Lint

```
$ npm run lint

or

$ npm run lint -- --fix
```

### History
-> [Release Note](https://github.com/ask-utils/ask-utils/releases)


### Contributors

 | Name | Version | 
 | :-- | :-- | 
 | [@ArtskydJ](https://github.com/ArtskydJ) | v0.13.0 | 
