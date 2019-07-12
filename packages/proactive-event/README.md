# ASK-Utils - Utility functions for ask-sdk
[![Build Status](https://travis-ci.org/ask-utils/proactive-event.svg?branch=master)](https://travis-ci.org/ask-utils/proactive-event)
[![npm version](https://badge.fury.io/js/@ask-utils/proactive-event.svg)](https://badge.fury.io/js/@ask-utils/proactive-event)
![logo](https://raw.githubusercontent.com/ask-utils/ask-utils/master/docs/img/logo.png)

https://ask-utils.github.io/proactive-event/

## Getting started

```
$ npm i -S @ask-utils/proactive-event
```

## Usage

```typescript
import { Client, MediaContent } from '@ask-utils/proactive-event'

// setup client
const clientSecret = 'XXXXXXXXXXXXXX'
const client = new Client({
  clientId: 'amzn1.application-oa2-client.XXXXXXXXX',
  clientSecret: 'XXXXXXXXXXXXXX',
  apiRegion: 'FE' // default: US
})
// configure event information
const PayloadBuilder = MediaContent.Available.PayloadFactory.init()
const parameters = PayloadBuilder
  .setMediaType('ALBUM')
  .setStartTime(moment('2019-03-11T10:05:58.561Z').toDate())
  .setDistributionMethod('AIR')
  .getParameter()
// configure localizedAttributes
const localizedAttributes = LocalizedAttributes.Factory.init()
  .putLocalizedAttribute('en-US', 'contentName', 'New CD')
  .putLocalizedAttribute('ja-JP', 'contentName', 'あたらしいCD')
  .getLocalizedAttributes()

// Call proactive event API
client.setEvent(parameters)
  .setRelevantAudience('Multicast')
  .setLocalizedAttributes(localizedAttributes)
  .requestEvent()
  .then(result => console.log(result))
  .catch(result => console.log(result))

// requested body
{
  "timestamp": "2019-03-14T06:19:23.625Z",
  "expiryTime": "2019-03-15T06:19:23.627Z",
  "event": {
    "name": "AMAZON.MediaContent.Available",
    "payload": {
      "availability": {
        "method": "AIR",
        "startTime": "2019-03-11T10:05:58.561Z"
      },
      "content": {
        "name": "localizedattribute:contentName",
        "contentType": "ALBUM"
      }
    }
  },
  "relevantAudience": {
    "type": "Multicast"
  },
  "referenceId": "9f96ac5e-b341-46bd-b137-6d3b1812ec1d",
  "localizedAttributes": [
    {
      "locale": "en-US",
      "contentName": "New CD"
    },
    {
      "locale": "ja-JP",
      "contentName": "あたらしいCD"
    }
  ]
}

```

## Features

### Client

We can easy to call the Proactive event API by the client.

```typescript
import { Client } from '@ask-utils/proactive-event'

const clientSecret = 'XXXXXXXXXXXXXX'
const client = new Client({
  clientId: 'amzn1.application-oa2-client.XXXXXXXXX',
  clientSecret: 'XXXXXXXXXXXXXX',
  apiRegion: 'FE' // default: US
})

const payload = {
  availability: {
    method: "AIR",
    startTime: "2019-03-11T10:05:58.561Z"
  },
  content: {
    contentType: "ALBUM",
    name: "localizedattribute:contentName"
  }
}

client.setPayload(payload)
  .setEventName("AMAZON.MediaContent.Available")
  .setRelevantAudience("Multicast")
  .requestEvent()
  .then(result => console.log(result))
  .catch(result => console.log(result))
```

### LocalizedAttributes Builder

We can easy to create LocalizedAttributes.

```typescript
import { LocalizedAttributes } from '../../dist/index'

const AttributesBuilder = LocalizedAttributes.Factory.init()
  .putLocalizedAttribute('ja-JP', 'gameName', 'ポケモン')
  .putLocalizedAttribute('en-US', 'gameName', 'pokemon')
  .getLocalizedAttributes()

[
  { locale: 'ja-JP', gameName: 'ポケモン' },
  { locale: 'en-US', gameName: 'pokemon' }
]
```

### Payload Builder

And we can easy to create request payload by the following builders.

```typescript
import { Client, MediaContent } from '@ask-utils/proactive-event'

const clientSecret = 'XXXXXXXXXXXXXX'
const client = new Client({
  clientId: 'amzn1.application-oa2-client.XXXXXXXXX',
  clientSecret: 'XXXXXXXXXXXXXX',
  apiRegion: 'FE' // default: US
})

const PayloadBuilder = MediaContent.Available.PayloadFactory.init()
PayloadBuilder
  .setMediaType('ALBUM')
  .setStartTime(moment('2019-03-11T10:05:58.561Z').toDate())
  .setDistributionMethod('AIR')
  .getParameter()

client.setEvent(PayloadBuilder.getParameter())
  .setRelevantAudience("Multicast")
  .requestEvent()
  .then(result => console.log(result))
  .catch(result => console.log(result))
```

#### AMAZON.MediaContent.Available

```typescript
import { MediaContent } from '@ask-utils/proactive-event'

const PayloadBuilder = MediaContent.Available.PayloadFactory.init()
PayloadBuilder
  .setMediaType('ALBUM')
  .setStartTime(moment('2019-03-11T10:05:58.561Z').toDate())
  .setDistributionMethod('AIR')
  .getParameter()

{
  "name": "AMAZON.MediaContent.Available",
  "payload": {
    "availability": {
      "method": "AIR",
      "startTime": "2019-03-11T10:05:58.561Z"
    },
    "content": {
      "contentType": "ALBUM",
      "name": "localizedattribute:contentName"
    }
  }
}
```

#### AMAZON.TrashCollectionAlert.Activated

```typescript
import { TrashCollectionAlert } from '@ask-utils/proactive-event'

const PayloadBuilder = TrashCollectionAlert.Activated.PayloadFactory.init()
PayloadBuilder
  .setCollectionDayOfWeek('MONDAY')
  .addGarbageType('BOTTLES')
  .addGarbageType('BULKY')
  .addGarbageType('CANS')
  .getParameter()

{
  "name": "AMAZON.TrashCollectionAlert.Activated",
  "payload": {
    "alert": {
      "collectionDayOfWeek": "MONDAY",
      "garbageTypes": [
        "BOTTLES",
        'BULKY',
        'CANS'
      ]
    }
  }
}
```

### AMAZON.WeatherAlert.Activated

```typescript
import { WeatherAlert } from '@ask-utils/proactive-event'

const PayloadBuilder = WeatherAlert.Activated.PayloadFactory.init()
PayloadBuilder
  .setAlertType('HURRICANE')
  .setAlertSource('example source')
  .getParameter()

{
  "name": "AMAZON.WeatherAlert.Activated",
  "payload": {
    "weatherAlert": {
      "source": "example source",
      "alertType": "HURRICANE"
    }
  }
}
```

### AMAZON.MessageAlert.Activated

```typescript
import { MessageAlert } from '@ask-utils/proactive-event'
const PayloadBuilder = MessageAlert.Activated.PayloadFactory.init()

PayloadBuilder.setMessageCreator('john')
    .setMessageCount(1)
    .setMessageStatus('FLAGGED')
    .getParameter()

{
  "name": "AMAZON.MessageAlert.Activated",
  "payload": {
    "messageGroup": {
      "count": 1,
      "creator": {
        "name": "john"
      }
    },
    "state": {
      "status": "FLAGGED"
    }
  }
}
```

### AMAZON.Occasion.Updated


```typescript
import { Occasion } from '@ask-utils/proactive-event'
const PayloadBuilder = Occasion.Updated.PayloadFactory.init()

PayloadBuilder
  .setBookingTime(new Date())
  .setOccasionType('APPOINTMENT')
  .setSubject('subject')
  .getParameter()

{
  "name": "AMAZON.Occasion.Updated",
  "payload": {
    "state": {
      "confirmationStatus": "CONFIRMED"
    },
    "occasion": {
      "occasionType": "APPOINTMENT",
      "subject": "subject",
      "provider": {
        "name": "localizedattribute:providerName"
      },
      "bookingTime": "2019-03-14T04:24:15.097Z",
      "broker": {
        "name": "localizedattribute:brokerName"
      }
    }
  }
}

```

### AMAZON.OrderStatus.Updated

```typescript
import { OrderStatus } from '@ask-utils/proactive-event'
const PayloadBuilder = OrderStatus.Updated.PayloadFactory.init()

PayloadBuilder
  .setEnterTimestamp(new Date())
  .setExpectedArrival(new Date())
  .setOrderStatus('ORDER_DELIVERED')
  .getParameter()

{
  "name": "AMAZON.OrderStatus.Updated",
  "payload": {
    "state": {
      "status": "ORDER_DELIVERED",
      "enterTimestamp": "2019-03-14T04:25:46.031Z",
      "deliveryDetails": {
        "expectedArrival": "2019-03-14T04:25:46.033Z"
      }
    },
    "order": {
      "seller": {
        "name": "localizedattribute:sellerName"
      }
    }
  }
}
```

### AMAZON.SocialGameInvite.Available

```typescript
import { SocialGameInvite } from '@ask-utils/proactive-event'
const PayloadBuilder = SocialGameInvite.Available.PayloadFactory.init()

PayloadBuilder.setGameName('Game')
  .setGameOfferName('MATCH')
  .setInviteType('CHALLENGE')
  .setRelationshipToInvitee('FRIEND')
  .getParameter()

{
  "name": "AMAZON.SocialGameInvite.Available",
  "payload": {
    "invite": {
      "inviteType": "CHALLENGE",
      "inviter": {
        "name": ""
      },
      "relationshipToInvitee": "FRIEND"
    },
    "game": {
      "offer": "MATCH",
      "name": "Game"
    }
  }
}
```
### AMAZON.SportsEvent.Updated

```typescript
import { SportsEvent } from '@ask-utils/proactive-event'

SportsEvent.Updated.PayloadFactory.init()
  .setAwayTeamStatistic('away', 10)
  .setHomeTeamStatistic('home', 0)
  .getParameter()

{
  "name": "AMAZON.SportsEvent.Updated",
  "payload": {
    "sportsEvent": {
      "eventLeague": {
        "name": "localizedattribute:eventLeagueName"
      },
      "homeTeamStatistic": {
        "team": {
          "name": "home"
        },
        "score": 0
      },
      "awayTeamStatistic": {
        "team": {
          "name": "away"
        },
        "score": 10
      }
    }
  }
}

```

## development

```
$ git clone git@github.com:ask-utils/proactive-event.git
$ cd proactive-event
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
-> [Release Note](https://github.com/ask-utils/proactive-event/releases)


### Contributors

|Name|Version|
|:--|:--|
|[]()||
