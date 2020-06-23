## Logger service for ask-sdk

Simply logger service for ask-sdk.

### Usage

```typescript
import { LoggerService } from '@ask-utils/labo'

const LaunchRequestHandler: RequestHandler = {
    canHandle(input) {
        return input.requestEnvelope.request.type === 'LaunchRequest'
    },
    handle(input) {
        const { logger } = LoggerService.getInstance()
         logger.info('handler Log')
         return input.responseBuilder.getResponse()
    }
}

export const handler = async (event: RequestEnvelope, context?: Context): Promise<ResponseEnvelope> => {
    const { logger } = LoggerService.getInstance(event)
    logger.info(event)
    const result = await SkillBuilders.custom()
        .addRequestHandlers(LaunchRequestHandler)
        .withApiClient(new DefaultApiClient())
        .create().invoke(event, context)
    logger.info(result)
    return result
}
```

### Customize

It's using [tslog](https://github.com/fullstack-build/tslog).
We can customize the log settings.


```typescript
import { LoggerService } from '@ask-utils/labo'

const LaunchRequestHandler: RequestHandler = {
    canHandle(input) {
        return input.requestEnvelope.request.type === 'LaunchRequest'
    },
    handle(input) {
        /**
         * Once set a config, just call it without any params!
         **/
        const { logger } = LoggerService.getInstance()
         logger.info('handler Log')
         return input.responseBuilder.getResponse()
    }
}

export const handler = async (event: RequestEnvelope, context?: Context): Promise<ResponseEnvelope> => {
    const { logger } = LoggerService.getInstance(event, {
        type: 'json',
        exposeStack: true,
        logLevel: 'info',
    })
    logger.info(event)
    const result = await SkillBuilders.custom()
        .addRequestHandlers(LaunchRequestHandler)
        .withApiClient(new DefaultApiClient())
        .create().invoke(event, context)
    logger.info(result)
    return result
}
```

