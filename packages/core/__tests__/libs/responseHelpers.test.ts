import {
    getRandomMessage
} from '../../libs/responseHelpers'

describe('libs/responseHelpers.ts', () => {
    describe('getRandomMessage()', () => {
        it('should return at least one string', () => {
            const message = getRandomMessage([
                'a',
                'b'
            ])
            expect(message).not.toEqual('')
        })
    })
})
