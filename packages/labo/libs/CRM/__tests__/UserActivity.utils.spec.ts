import moment from 'moment'
import {
    getUnixTime
} from '../UserActivity.utils'

describe('CRM/UserActivity.utils.ts', () => {
    describe('getUnixTime', () => {
        it('should return valid unix time', () => {
            const date = new Date()
            expect(getUnixTime(date)).toEqual(moment(date).unix())
        })
        it('should not match unix time when change any time', () => {
            const date = new Date()
            expect(getUnixTime(date))
                .not.toEqual(moment(date).add(1, 'seconds').unix())
        })
    })
})
