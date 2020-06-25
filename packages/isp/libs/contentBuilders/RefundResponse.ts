import ContentBuilder, {
    ResponseContent
} from './base'

export class RefundResponseContentBuilder extends ContentBuilder {
    // purchaseResult === 'DECLINED'
    private getDeclinedRefundResult (): ResponseContent {
        if (this.isJP()) {
            return {
                speechText: [
                    '承知しました。',
                    '次はなにをしますか？'
                ].join(' '),
                repromptText: '次はなにをしますか？'
            }
        }
        return {
            speechText: [
                'Ok.',
                'What will you do for next?'
            ].join(' '),
            repromptText: 'What will you do for next?'
        }
    }

    public setDeclinedRefundResult (): this {
        this.contents = this.getDeclinedRefundResult()
        return this
    }

    // purchaseResult === 'ACCEPTED'
    private getAcceptedRefundResult (): ResponseContent {
        if (this.isJP()) {
            return {
                speechText: [
                    'お使いいただいてありがとうございました。',
                    '次は何をしますか？'
                ].join(' '),
                repromptText: '次は何をしますか？'
            }
        }
        return {
            speechText: [
                'Thanks for enjoy the packages. ',
                'What will you do for next?'
            ].join(' '),
            repromptText: 'What will you do for next?'
        }
    }

    public setAcceptedRefundResult (): this {
        this.contents = this.getAcceptedRefundResult()
        return this
    }

    private getFailedRefundResult (): ResponseContent {
        if (this.isJP()) {
            return {
                speechText: [
                    'キャンセル処理に失敗しました。',
                    'もう一度トライするか、アレクサアプリからサポートに問い合わせてください。'
                ].join(' ')
            }
        }
        return {
            speechText: [
                'There was an error handling your refund request.',
                'Please try again or contact us for help.'
            ].join(' ')
        }
    }

    public setFailedRefundResult (): this {
        this.contents = this.getFailedRefundResult()
        return this
    }
}
