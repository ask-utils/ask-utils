# ASK-Utils - Utility functions for ask-sdk
[![Build Status](https://travis-ci.org/ask-utils/ask-utils.svg?branch=master)](https://travis-ci.org/ask-utils/ask-utils)
[![npm version](https://badge.fury.io/js/ask-utils.svg)](https://badge.fury.io/js/ask-utils)
![logo](https://raw.githubusercontent.com/ask-utils/ask-utils/master/docs/img/logo.png)

https://ask-utils.github.io/ask-utils/

## Getting started

```
$ npm i -S ask-utils@next
```

## Usage

```js
const utils = require('ask-utils')

or

const { getRandomMessage, isLaunchRequest } = require('ask-utils')
```

```typescript
import utils from 'ask-utils'

or

import { isLaunchRequest, getRandomMessage } from 'ask-utils'
```

### getRandomMessage

We can easy create random response in your Alexa skill using ask-sdk.

```js
const { getRandomMessage } = require('ask-utils')
const errorMessages = [
  'I can not here what you say, please say again.',
  'Please say again.',
  "I'm sorry, please tell me again"
]

const ErrorHandler = {
  canHandle () {
    return true
  },
  handle (handlerInput, error) {
    console.log(`Error handled: ${error.message}`)
    const message = getRandomMessage(errorMessages)
    return handlerInput.responseBuilder
      .speak(message)
      .reprompt(message)
      .getResponse()
  }
}
```

### intentHandlers

```js
const LaunchRequestHandler = {
  canHandle (handlerInput) {
    return isLaunchRequest(handlerInput)
  },
  handle (handlerInput) {
    const speechText = 'This is example skill'

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse()
  }
}

const HelpIntentHandler = {
  canHandle (handlerInput) {
    return isMatchedIntent(handlerInput, 'AMAZON.HelpIntent')
  },
  handle (handlerInput) {
    const speechText = 'This is example skill'

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse()
  }
}
```

## development

```
$ git clone git@github.com:hideokamoto/ask-utils.git
$ cd ask-utils
$ npm i
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

|Name|Version|
|:--|:--|
|[@ArtskydJ](https://github.com/ArtskydJ)|v0.13.0|
