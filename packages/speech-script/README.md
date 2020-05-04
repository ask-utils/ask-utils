# JSX Speech Script
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
$ npm i -S @ask-utils/speech-script
```

## Basic Usage

```typescript
/** @jsx ssml */
import {
    StandardSkillFactory
} from 'ask-sdk'
import {
    ssml,
    SpeechScriptJSX
} from '../dist/index'
import { LaunchRequest } from 'ask-sdk-model'

/**
 * SSML component like React
 **/
class LaunchRequestScript extends SpeechScriptJSX<LaunchRequest> {
    speech() {
        const { locale } = this.props.request
        if (/^ja/.test(locale)) {
            return (
                <speak>こんにちは！<break time="0.5s"/>お元気ですか？</speak>
            )
        }
        return (
            <speak>
                Hello! <break time="0.5s"/>How are you?
            </speak>
        )
    }
    reprompt() {
        const { locale } = this.props.request
        if (/^ja/.test(locale)) {
            return (
                <speak>
                    お元気ですか？<break time="0.5s"/>
                    <amazon-effect name="whispered">今日はいい日になるといいですね。</amazon-effect>
                </speak>
            )
        }
        return (
            <speak>
                How are you?<break time="0.5s"/>
                <amazon-effect name="whispered">I hope you to have a good day.</amazon-effect>
            </speak>
        )

    }
}

/**
 * Use the SSML component in your RequestHandler
 **/
export const handler = StandardSkillFactory.init()
.addRequestHandlers({
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
    },
    handle(handlerInput) {
        const Speech = new LaunchRequestScript(handlerInput)
        const {
            speech,
            reprompt,
        } = Speech.create()
        return handlerInput.responseBuilder
            .speak(speech)
            .reprompt(reprompt)
            .getResponse()
    }
}).lambda()
```