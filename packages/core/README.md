# ASK-Utils - Utility functions for ask-sdk

![logo](https://ask-utils.dev/static/9cbabc261164aba75a5d7e32d0e53371/8a651/youtube_profile_image.png)

https://ask-utils.dev

## Getting started

```
$ npm i -S @ask-utils/core
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
$ git clone git@github.com:ask-utils/ask-utils.git
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
