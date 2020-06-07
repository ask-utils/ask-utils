# ASK Utils Labo
[![npm version](https://badge.fury.io/js/%40ask-utils%2Frouter.svg)](https://badge.fury.io/js/%40ask-utils%2Frouter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Maintainability](https://api.codeclimate.com/v1/badges/c17851759423ce151b9e/maintainability)](https://codeclimate.com/github/ask-utils/ask-utils/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c17851759423ce151b9e/test_coverage)](https://codeclimate.com/github/ask-utils/ask-utils/test_coverage)
[![Build Status](https://travis-ci.org/ask-utils/ask-utils.svg?branch=master)](https://travis-ci.org/ask-utils/ask-utils)
![logo](https://ask-utils.dev/static/9cbabc261164aba75a5d7e32d0e53371/8a651/youtube_profile_image.png)

https://ask-utils.dev

Experimental modules of ask-utils


## Getting started

```
$ npm i -S @ask-utils/labo
```

## Features

### PersistentAttributesManager

Wrapper class of PersistentAttributesManager to handle the props more easily.

#### Usage

```typescript
const persistentAttributesManager = PersistanteAttributesManager.getInstance(handlerInput.attributesManager)
await persistentAttributesManager.updatePersistentAttributes({
    name: 'John'
})
await persistentAttributesManager.save()
```

#### Auto merge the props

```typescript
await persistentAttributesManager.updatePersistentAttributes({
    name: 'John',
    count: 1,
})
await persistentAttributesManager.save()


await persistentAttributesManager.updatePersistentAttributes({
    message: 'hello',
    count: 2,
})
await persistentAttributesManager.save()

console.log(await persistentAttributesManager.getPersistentAttributes())

{
    name: 'John',
    count: 2,
    message: 'hello',
}
```

#### Detect should call AWS APIs

If no property has been updated, it will not call AWS API.

```typescript
const persistentAttributesManager = PersistanteAttributesManager.getInstance(handlerInput.attributesManager)

// NOTHING TO DO
await persistentAttributesManager.save()

await persistentAttributesManager.updatePersistentAttributes({
    name: 'John'
})
// CALL attributeManager.savePersistentAttributes to save the update
await persistentAttributesManager.save()

// NOTHING TO DO
await persistentAttributesManager.save()
```