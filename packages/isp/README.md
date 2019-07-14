# ASK-Utils - ISP helpers
[![npm version](https://badge.fury.io/js/%40ask-utils%2Fisp.svg)](https://badge.fury.io/js/%40ask-utils%2Fisp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Maintainability](https://api.codeclimate.com/v1/badges/c17851759423ce151b9e/maintainability)](https://codeclimate.com/github/ask-utils/ask-utils/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c17851759423ce151b9e/test_coverage)](https://codeclimate.com/github/ask-utils/ask-utils/test_coverage)
[![Build Status](https://travis-ci.org/ask-utils/ask-utils.svg?branch=master)](https://travis-ci.org/ask-utils/ask-utils)
![logo](https://ask-utils.dev/static/9cbabc261164aba75a5d7e32d0e53371/8a651/youtube_profile_image.png)

https://ask-utils.dev

NPM: https://www.npmjs.com/package/@ask-utils/isp

Alexa ISP (In Skill Purchasing) helpers.
Easy, Shot, Simply.

## Getting started

```
$ npm i -S @ask-utils/isp
```

## Before ISP Utils
We have to take care of a lot of case to make a buy request.

```typescript
import { getLocale } from 'ask-sdk-core'

const beforeISPUtils = {
  handle() {
    return true
  },
  async handler(handlerInput) {
  if (!handlerInput.serviceClientFactory) throw new Error('No service client')
  const client = handlerInput.serviceClientFactory.getMonetizationServiceClient()
  const { inSkillProducts } = await client.getInSkillProducts(getLocale(handlerInput.requestEnvelope))
  if (!inSkillProducts) throw new Error('No product')
  const product = inSkillProducts.find(product => product.name === 'YOUR_PPRODUCT_NAME')
  if (!product) throw new Error('no product')
  return handlerInput.responseBuilder
      .addDirective({
        'type': 'Connections.SendRequest',
        'name': 'Buy',
        'payload': {
          'InSkillProduct': {
            'productId': product.productId
          }
        },
        'token': 'correlationToken'
      })
      .getResponse()
  }
}
```

We just call our client. Don't have to find or filter API response lists.

```typescript
import { ISPProductClient, getBuyProductDirective } from '@ask-utils/isp'
const afterISPUtils = {
  handle() {
    return true
  },
  async handler(handlerInput) {
    const client = new ISPProductClient(handlerInput)
    const product = await client.searchProduct({
      productName: 'YOUR_PPRODUCT_NAME'
    })
    if (!product) throw new Error('no product')
    return handlerInput.responseBuilder
      .addDirective(getBuyProductDirective(product.productId))
      .getResponse()
  }
}
```

## Interceptors

### Load ISP data
If start a new Session, it call ISP API to get your products and set to the session attributes.
The idea is from this blog post.
https://developer.amazon.com/ja/blogs/alexa/post/75ee61df-8365-44bb-b28f-e708000891ad/how-to-use-interceptors-to-simplify-handler-code-and-cache-product-and-purchase-information-in-monetized-alexa-skills

```typescript
import { loadISPDataInterceptor } from '@ask-utils/isp'

// add interceptor
.addRequestInteceptor(loadISPDataInterceptor)
```

You can get the products by the following code.

```typescript

// get product from session attributes
import { getAllEntitledProducts } from '@ask-utils/isp'

const { inSkillProducts } = handlerInput.attributesManager.getSessionAttributes()
const entitledProducts = getAllEntitledProducts(inSkillProducts)
```

## General Handlers

You can add several handlers for ISP request.

```typescript
import { SkillBuilders } from 'ask-sdk'
import {
  ISPHandlers,
  loadISPDataInterceptor
} from '@ask-utils/isp'


SkillBuilders.standard()
  .addRequestHandlers(
    ...ISPHandlers,
  )
  .addRequestInterceptors(
    loadISPDataInterceptor
  )
  .lambda()
```


## development

```
$ git clone git@github.com:ask-utils/isp.git
$ cd isp
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
-> [Release Note](https://github.com/ask-utils/isp/releases)


### Contributors

|Name|Version|
|:--|:--|
|[]()||
