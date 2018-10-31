# ASK-Utils - Utility functions for ask-sdk
[![Build Status](https://travis-ci.org/ask-utils/ask-utils.svg?branch=master)](https://travis-ci.org/ask-utils/ask-utils)
[![npm version](https://badge.fury.io/js/ask-utils.svg)](https://badge.fury.io/js/ask-utils)
![logo](https://raw.githubusercontent.com/ask-utils/ask-utils/master/docs/img/logo.png)

https://ask-utils.github.io/ask-utils/

## Getting started

```
$ npm i -S ask-utils
```

## Usage

```js
const { getRandomMessage, canHandle, getHandlerInput } = require('ask-utils')
```

some function can check example usage at wiki.
[https://github.com/hideokamoto/ask-utils/wiki/Test-Utilities](https://github.com/hideokamoto/ask-utils/wiki/Test-Utilities)

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
We can easy write `canHandle` function by using `canHandle` function.

```js
const HelpIntentHandler = {
  canHandle (handlerInput) {
    return canHandle(handlerInput, 'IntentRequest', 'AMAZON.HelpIntent')
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

#### functions

```js
const { getRequest canHandle, getDialogState, getIntent } = require('ask-utils')
const HelpIntentHandler = {
  canHandle (handlerInput) {
    return canHandle(handlerInput, 'IntentRequest', 'AMAZON.HelpIntent')
  },
  handle (handlerInput) {
    // same as const request = handlerInput.requestEnvelope.request
    const request = getRequest(handlerInput)

    // same as const dialogState = handlerInput.requestEnvelope.request.dialogState
    const dialogState = getDialogState(handlerInput)

    // same as const intent = handlerInput.requestEnvelope.request.intent
    const intent = getIntent(handlerInput)
```

### slotManager (Beta)

Easy to get intent slot value.

```js
const { canHandle, getSlotValueByName } = require('ask-utils')
const ExampleIntentHandler = {
  canHandle (handlerInput) {
    return canHandle(handlerInput, 'IntentRequest', 'ExampleIntent')
  },
  handle (handlerInput) {
    const yourName = getSlotValueByName(handlerInput, 'nameSlot')
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

### History
-> [Release Note](https://github.com/ask-utils/ask-utils/releases)


### Contributors

|Name|Version|
|:--|:--|
|[@ArtskydJ](https://github.com/ArtskydJ)|v0.13.0|
