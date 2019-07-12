
import {
    getAvailability,
    getCreativeWork,
    getWeatherAlert,
    getMessageGroup,
    getMessageState
} from '../../../libs/helpers/index'

const execGenericTests = (func: Function) => {
    it('should throw error when given null', () => {
        expect(() => func(null)).toThrow()
    })
    it('should throw error when given undefined', () => {
        expect(() => func(undefined)).toThrow()
    })
    it('should throw error when given number', () => {
        expect(() => func(100)).toThrow()
    })
    it('should throw error when given string', () => {
        expect(() => func('string')).toThrow()
    })
    it('should throw error when given empty object', () => {
        expect(() => func({})).toThrow()
    })
    it('should throw error when given invalid object', () => {
        expect(() => func({
            hoge: true
        })).toThrow()
    })
}

describe('/libs/helpers/index.ts', () => {
    describe('getAvailability', () => {
        execGenericTests(getAvailability)
        it('should throw error when given valid object', () => {
            const param = getAvailability({
                startTime: 'datetime',
                method: 'AIR',
                hoge: true
            })
            expect(param).toEqual({
                startTime: 'datetime',
                method: 'AIR'
            })
        })
    })
    describe('getCreativeWork', () => {
        execGenericTests(getCreativeWork)
        it('should throw error when given valid object', () => {
            const param = getCreativeWork({
                name: 'localizedattribute:contentName',
                contentType: 'BOOK',
                hoge: true
            })
            expect(param).toEqual({
                name: 'localizedattribute:contentName',
                contentType: 'BOOK'
            })
        })
    })

    describe('getWeatherAlert', () => {
        execGenericTests(getWeatherAlert)
        it('should return valid props when given valid object', () => {
            const param = getWeatherAlert({
                alertType: 'TORNADO',
                hoge: true
            })
            expect(param).toEqual({
                alertType: 'TORNADO'
            })
        })
        it('should return valid props when given valid object', () => {
            const param = getWeatherAlert({
                alertType: 'TORNADO',
                source: 'source',
                hoge: true
            })
            expect(param).toEqual({
                source: 'source',
                alertType: 'TORNADO'
            })
        })
    })

    describe('getMessageGroup', () => {
        execGenericTests(getMessageGroup)
        it('should return valid props when given valid object', () => {
            const param = getMessageGroup({
                creator: {
                    name: 'hello'
                },
                count: 10,
                hoge: true
            })
            expect(param).toEqual({
                creator: {
                    name: 'hello'
                },
                count: 10
            })
        })
        it('should return valid props when given valid object', () => {
            const param = getMessageGroup({
                creator: {
                    name: 'hello'
                },
                count: 10,
                urgency: 'URGENT',
                hoge: true
            })
            expect(param).toEqual({
                creator: {
                    name: 'hello'
                },
                count: 10,
                urgency: 'URGENT'
            })
        })
    })

    describe('getMessageState', () => {
        execGenericTests(getMessageState)
        it('should return valid props when given valid object', () => {
            const param = getMessageState({
                status: 'UNREAD',
                hoge: true
            })
            expect(param).toEqual({
                status: 'UNREAD'
            })
        })
        it('should return valid props when given valid object', () => {
            const param = getMessageState({
                status: 'UNREAD',
                freshness: 'OVERDUE',
                hoge: true
            })
            expect(param).toEqual({
                freshness: 'OVERDUE',
                status: 'UNREAD'
            })
        })
    })
})
