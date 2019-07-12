import {
    createRandomToken,
    getBuyProductDirective
} from '../../libs/directiveBuilders'

describe('libs/directiveBuilders.ts', () => {
    describe('createRandomToken', () => {
        it('should return string', () => {
            expect(typeof createRandomToken()).toEqual('string')
        })
    })
    describe('getBuyProductDirective()', () => {
        it('should return directive with product id', () => {
            const directive = getBuyProductDirective('product_id', 'token')
            expect(directive).toEqual({
                type: 'Connections.SendRequest',
                name: 'Buy',
                payload: {
                    InSkillProduct: {
                        productId: 'product_id'
                    }
                },
                token: 'token'
            })
        })
    })
})
