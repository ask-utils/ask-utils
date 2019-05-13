import { services } from 'ask-sdk-model'

export const hasServiceClientFactory = (client?: services.ServiceClientFactory): client is services.ServiceClientFactory => {
    return client !== undefined
}
