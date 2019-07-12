import moment from 'moment'
import ParameterFactory from '../../../../libs/MediaContent/Available/PayloadFactory'

describe('/libs/MediaContent/Available/PayloadFactory.ts', () => {
    it('should not throw error when init the class', () => {
        expect(() => ParameterFactory.init()).not.toThrow()
    })
    let PayloadBuilder = ParameterFactory.init()
    beforeEach(() => PayloadBuilder = ParameterFactory.init())
    describe('getEventName()', () => {
        it('should return false when given string', () => {
            expect(PayloadBuilder.getEventName()).toEqual('AMAZON.MediaContent.Available')
        })
    })
    describe('Exceptions', () => {
        it('should throw error when availability prop is empty', () => {
            expect(() => {
                PayloadBuilder.getParameter()
            }).toThrowError('Invalid Availability object')
        })
        it('should throw error when availability prop is not complete', () => {
            expect(() => {
                PayloadBuilder
                    .setStartTime(moment('2019-03-11T10:05:58.561Z').toDate())
                    .getParameter()
            }).toThrowError('Invalid Availability object')
        })
        it('should throw error when content prop is not complete', () => {
            expect(() => {
                PayloadBuilder
                    .setStartTime(moment('2019-03-11T10:05:58.561Z').toDate())
                    .setDistributionMethod('AIR')
                    .getParameter()
            }).toThrowError('Invalid creative work object')
        })
    })
    describe('getParameter', () => {
        it('should return valid object [no provider]', () => {
            const parameter = PayloadBuilder
                .setMediaType('ALBUM')
                .setStartTime(moment('2019-03-11T10:05:58.561Z').toDate())
                .setDistributionMethod('AIR')
                .getParameter()
            expect(parameter).toEqual({
                'name': 'AMAZON.MediaContent.Available',
                'payload': {
                    'availability': {
                        'method': 'AIR',
                        'startTime': '2019-03-11T10:05:58.561Z'
                    },
                    'content': {
                        'contentType': 'ALBUM',
                        'name': 'localizedattribute:contentName'
                    }
                }
            })
        })
        it('should return valid object [FULL Attributes]', () => {
            const parameter = PayloadBuilder
                .setMediaType('ALBUM')
                .setStartTime(moment('2019-03-11T10:05:58.561Z').toDate())
                .setDistributionMethod('AIR')
                .setProvider('test provider')
                .getParameter()
            expect(parameter).toEqual({
                'name': 'AMAZON.MediaContent.Available',
                'payload': {
                    'availability': {
                        'method': 'AIR',
                        'provider': { 'name': 'test provider' },
                        'startTime': '2019-03-11T10:05:58.561Z'
                    },
                    'content': {
                        'contentType': 'ALBUM',
                        'name': 'localizedattribute:contentName'
                    }
                }
            })
        })
    })
})
