import ParameterFactory from '../../../../libs/MessageAlert/Activated/PayloadFactory'

describe('/libs/MessageAlert/Activated/PayloadFactory.test.ts', () => {
    it('should not throw error when init the class', () => {
        expect(() => ParameterFactory.init()).not.toThrow()
    })
    let PayloadBuilder = ParameterFactory.init()
    beforeEach(() => PayloadBuilder = ParameterFactory.init())
    describe('getEventName()', () => {
        it('should return false when given string', () => {
            expect(PayloadBuilder.getEventName()).toEqual('AMAZON.MessageAlert.Activated')
        })
    })

    describe('getParameter', () => {
        it('should return valid object [simple usage]', () => {
            const parameter = PayloadBuilder
                .setMessageCreator('john')
                .setMessageCount(1)
                .setMessageStatus('FLAGGED')
                .getParameter()
            expect(parameter).toEqual({
                name: 'AMAZON.MessageAlert.Activated',
                payload: {
                    messageGroup: {
                        count: 1,
                        creator: {
                            name: 'john'
                        }
                    },
                    state: {
                        status: 'FLAGGED'
                    }
                }
            })
        })
        it('should return valid object [simple usage]', () => {
            const parameter = PayloadBuilder
                .setMessageCreator('john')
                .setMessageCount(1)
                .setMessageUrgency()
                .setMessageStatus('FLAGGED')
                .setMessageFreshness('NEW')
                .getParameter()
            expect(parameter).toEqual({
                name: 'AMAZON.MessageAlert.Activated',
                payload: {
                    messageGroup: {
                        count: 1,
                        creator: {
                            name: 'john'
                        },
                        urgency: 'URGENT'
                    },
                    state: {
                        freshness: 'NEW',
                        status: 'FLAGGED'
                    }
                }
            })
        })
    })
})
