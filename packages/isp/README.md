# ASK-Utils - Utility functions for ask-sdk
[![Build Status](https://travis-ci.org/ask-utils/isp.svg?branch=master)](https://travis-ci.org/ask-utils/isp)

NPM: https://www.npmjs.com/package/@ask-utils/isp
Docs: https://ask-utils.github.io/isp/

Alexa ISP (In Skill Purchasing) helpers.
Easy, Shot, Simpley.

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
