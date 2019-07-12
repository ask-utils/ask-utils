import {
    isString,
    isNumber,
    isObject,
    isEmpty,
    isAvailability,
    isCreativeWork,
    isWeatherAlert,
    isMessageGroup,
    isMessageState
} from '../../../libs/helpers/typeGuards'

const object = { hoge: true }

const execGenericTests = (func: Function, allowEmptyObj: boolean = false) => {
    it('should return false when given null', () => {
        expect(func(null)).toEqual(false)
    })
    it('should return false when given undefined', () => {
        expect(func(undefined)).toEqual(false)
    })
    it('should return false when given number', () => {
        expect(func(100)).toEqual(false)
    })
    it('should return false when given string', () => {
        expect(func('string')).toEqual(false)
    })
    if (allowEmptyObj) {
        it('should return false when given empty object', () => {
            expect(func({})).toEqual(true)
        })
    }
}

describe('/libs/helpers/typeGuards.ts', () => {
    describe('isObject()', () => {
        execGenericTests(isObject, true)
        it('should return false when given object', () => {
            expect(isObject(object)).toEqual(true)
        })
    })
    describe('isNumber()', () => {
        it('should return false when given null', () => {
            expect(isNumber(null)).toEqual(false)
        })
        it('should return false when given undefined', () => {
            expect(isNumber(undefined)).toEqual(false)
        })
        it('should return false when given number', () => {
            expect(isNumber(100)).toEqual(true)
        })
        it('should return false when given string', () => {
            expect(isNumber('string')).toEqual(false)
        })
        it('should return false when given empty object', () => {
            expect(isNumber({})).toEqual(false)
        })
        it('should return false when given object', () => {
            expect(isNumber(object)).toEqual(false)
        })
    })
    describe('isString()', () => {
        it('should return false when given null', () => {
            expect(isString(null)).toEqual(false)
        })
        it('should return false when given undefined', () => {
            expect(isString(undefined)).toEqual(false)
        })
        it('should return false when given number', () => {
            expect(isString(100)).toEqual(false)
        })
        it('should return false when given string', () => {
            expect(isString('string')).toEqual(true)
        })
        it('should return false when given empty object', () => {
            expect(isString({})).toEqual(false)
        })
        it('should return false when given object', () => {
            expect(isString(object)).toEqual(false)
        })
    })
    describe('isEmpty', () => {
        it('should return false when given number', () => {
            expect(isEmpty(100)).toEqual(true)
        })
        it('should return false when given string', () => {
            expect(isEmpty('string')).toEqual(true)
        })
        it('should return true when given empty object', () => {
            expect(isEmpty({})).toEqual(true)
        })
        it('should return false when given object', () => {
            expect(isEmpty(object)).toEqual(false)
        })
    })
    describe('isCreativeWork()', () => {
        execGenericTests(isCreativeWork)
        it('should return false when given object', () => {
            expect(isCreativeWork({
                name: 'hello'
            })).toEqual(false)
        })
        it('should return false when given object', () => {
            expect(isCreativeWork({
                contentType: 'type'
            })).toEqual(false)
        })
        it('should return true when given object has valid props', () => {
            expect(isCreativeWork({
                name: 'hello',
                contentType: 'type'
            })).toEqual(true)
        })
    })
    describe('isAvailability()', () => {
        execGenericTests(isAvailability)
        it('should return false when given object', () => {
            expect(isAvailability({
                startTime: 'hello'
            })).toEqual(false)
        })
        it('should return false when given object', () => {
            expect(isAvailability({
                method: 'type'
            })).toEqual(false)
        })
        it('should return true when given object has valid props', () => {
            expect(isAvailability({
                startTime: 'hello',
                method: 'type'
            })).toEqual(true)
        })
    })
    describe('isWeatherAlert()', () => {
        execGenericTests(isWeatherAlert)
        it('should return false when given invalid object', () => {
            expect(isWeatherAlert({
                startTime: 'hello'
            })).toEqual(false)
        })
        it('should return true when given object', () => {
            expect(isWeatherAlert({
                alertType: 'hoge'
            })).toEqual(true)
        })
    })
    describe('isMessageGroup()', () => {
        execGenericTests(isMessageGroup)
        it('should return false when given invalid object', () => {
            expect(isMessageGroup({
                startTime: 'hello'
            })).toEqual(false)
        })
        it('should return false when given invalid object', () => {
            expect(isMessageGroup({
                creator: 'hoge'
            })).toEqual(false)
        })
        it('should return true when given object', () => {
            expect(isMessageGroup({
                creator: 'hoge',
                count: 1
            })).toEqual(true)
        })
    })
    describe('isMessageState()', () => {
        execGenericTests(isMessageState)
        it('should return false when given invalid object', () => {
            expect(isMessageState({
                startTime: 'hello'
            })).toEqual(false)
        })
        it('should return true when given object', () => {
            expect(isMessageState({
                status: 'hoge'
            })).toEqual(true)
        })
    })
})
