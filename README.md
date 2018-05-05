# Utility functions for ask-sdk
[![Build Status](https://travis-ci.org/hideokamoto/ask-utils.svg?branch=master)](https://travis-ci.org/hideokamoto/ask-utils)
[![npm version](https://badge.fury.io/js/ask-utils.svg)](https://badge.fury.io/js/ask-utils)

## Getting started

```
$ npm i -S ask-utils
```

## Usage

```
const { randomResponse, intentHandlers, slotManager } = require('ask-utils')
```

### randomResponse

We can easy create random response in your Alexa skill using ask-sdk.

```
const { randomResponse } = require('ask-utils')
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
    const message = randomResponse.getRandomMessage(errorMessages)
    return handlerInput.responseBuilder
      .speak(message)
      .reprompt(message)
      .getResponse()
  }
}
```

### intentHandlers
We can easy write `canHandle` function by using `intentHandlers.canHandle` function.

```
const HelpIntentHandler = {
  canHandle (handlerInput) {
    return intentHandlers.canHandle(handlerInput, 'IntentRequest', 'AMAZON.HelpIntent')
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

### slotManager (Beta)

Easy to get intent slot value.

```
const ExampleIntentHandler = {
  canHandle (handlerInput) {
    return intentHandlers.canHandle(handlerInput, 'IntentRequest', 'ExampleIntent')
  },
  handle (handlerInput) {
    const yourName = slotManager.getSlotValueByName(handlerInput, 'nameSlot')
    const speechText = `Hello ${yourName} ! Welcome to our skill !`

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
