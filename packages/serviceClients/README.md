# ASK-Utils / ServiceClient alternative
[![npm version](https://badge.fury.io/js/%40ask-utils%2Fservice-client.svg)](https://badge.fury.io/js/%40ask-utils%2Fservice-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Maintainability](https://api.codeclimate.com/v1/badges/c17851759423ce151b9e/maintainability)](https://codeclimate.com/github/ask-utils/ask-utils/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c17851759423ce151b9e/test_coverage)](https://codeclimate.com/github/ask-utils/ask-utils/test_coverage)
[![Build Status](https://travis-ci.org/ask-utils/ask-utils.svg?branch=master)](https://travis-ci.org/ask-utils/ask-utils)

![logo](https://ask-utils.dev/static/9cbabc261164aba75a5d7e32d0e53371/8a651/youtube_profile_image.png)

https://ask-utils.dev

Simple Service Client package for Alexa APIs.
https://www.npmjs.com/package/@ask-utils/service-client

```bash
$ npm i -S @ask-utils/service-client
```

## Usage

```typescript
import { UserProfileAPIClient } from '@ask-utils/service-client'


const ExampleHandler = {
  ...,
  async handle(handlerInput: HanlderInput) {
    const client = new UserProfileAPIClient(handlerInput.requestEnvelope)
    const email = await client.getEmail()
    const profileName = await client.getProfileName()
    const givenName = await client.getGivenName()
    const {countryCode, phoneNumber} = await client.getMovileNumber()
    ...
  }
}
```

## Clients
### UserProfileAPIClient

```typescript
import { UserProfileAPIClient } from '@ask-utils/service-client'

const client = new UserProfileAPIClient(handlerInput.requestEnvelope)
const email = await client.getEmail()
const profileName = await client.getProfileName()
const givenName = await client.getGivenName()
const {countryCode, phoneNumber} = await client.getMovileNumber()
```

### SettingAPIClient

```typescript
import { SettingAPIClient } from '@ask-utils/service-client'

const client = new SettingAPIClient(handlerInput.requestEnvelope)
const timezone  = await client.getTimezone()
const tmpUnit = await client.getTempratureUnit()
const distUnit = await client.getDistanceUnits()
```

### ListManagementAPIClient


### ReminderAPIClient

### DeviceAPIClient 

