
import { ResponseBuilder } from 'ask-sdk-core'
import { Response, services } from 'ask-sdk-model'
import { getAllPurchasableProducts } from '../productFinders'
import monetization = services.monetization
import InSkillProduct = monetization.InSkillProduct
type InskillProducts = InSkillProduct[]
export const makeParagraphText = (messages: string[]): string => {
    return `<p>${messages.join(' </p><p>')}</p>`
}
export const UnSupportedISPResponse = (locale: string): {
    speechText: string;
    repromptText: string;
} => {
    if (/^ja/.test(locale)) {
        return {
            speechText: makeParagraphText([
                'すみません。',
                'お使いのデバイス・アプリでは、スキル内課金を利用することができません。',
                '別のデバイスを利用するか、アレクサアプリから設定を確認してもう一度お試しください。',
                '次はなにをしますか？',
                'スキルを終了して、アプリの設定を確認したい場合は「終了」と話しかけてください。'
            ]),
            repromptText: makeParagraphText([
                '次はなにをしますか？',
                'スキルを終了して、アプリの設定を確認したい場合は「終了」と話しかけてください。'
            ])
        }
    }
    return {
        speechText: makeParagraphText([
            'Sorry, you can not purchase by the device.',
            'Please check your device and application settings by the Alexa app.',
            'What will you do the next?'
        ]),
        repromptText: makeParagraphText([
            'What will you do the next?',
            'If you want to stop the skill, please say me "STOP".'
        ])
    }
}

export const NoProductResponse = (responseBuilder: ResponseBuilder, locale: string, products?: InskillProducts): Response => {
    const purchaseableProducts = products ? getAllPurchasableProducts(products) : []
    const purchaseableProductText = purchaseableProducts.map(product => product.name).join(', ')
    if (/^ja/.test(locale)) {
        return responseBuilder.speak([
            `${purchaseableProductText}を購入することができます。`,
            purchaseableProducts && purchaseableProducts.length > 0 ? [
                `詳細を聞きたい場合は「${purchaseableProducts[0].name}について教えて」、`,
                `購入する場合は「${purchaseableProducts[0].name}を購入」のように話しかけてください。`
            ].join('')
                : '',
            'どうしますか？'
        ].join(' '))
            .reprompt('購入・詳細、どちらにしますか？ゲームをする場合は、「ゲーム開始」と言ってください。')
            .getResponse()
    }
    return responseBuilder.speak([
        `You can buy ${purchaseableProductText} packages.`,
        'Buy or check the detail, what do you want?'
    ].join(' '))
        .reprompt('Buy or check the detail, what do you want?')
        .getResponse()
}
