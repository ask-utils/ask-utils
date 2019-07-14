# ASK-Utils / ServiceClient alternative

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

