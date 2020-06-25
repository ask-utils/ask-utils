import ParameterFactory from '../../../../libs/TrashCollectionAlert/Activated/PayloadFactory'

describe('/libs/TrashCollectionAlert/Activated/PayloadFactory.ts', () => {
    it('should not throw error when init the class', () => {
        expect(() => ParameterFactory.init()).not.toThrow()
    })
    let PayloadBuilder = ParameterFactory.init()
    beforeEach(() => PayloadBuilder = ParameterFactory.init())
    describe('getEventName()', () => {
        it('should return false when given string', () => {
            expect(PayloadBuilder.getEventName()).toEqual('AMAZON.TrashCollectionAlert.Activated')
        })
    })
    describe('getParameter', () => {
        it('should return valid object [simple usage]', () => {
            const parameter = PayloadBuilder
                .setCollectionDayOfWeek('FRIDAY')
                .addGarbageType('BOTTLES')
                .getParameter()
            expect(parameter).toEqual({
                name: 'AMAZON.TrashCollectionAlert.Activated',
                payload: {
                    alert: {
                        collectionDayOfWeek: 'FRIDAY',
                        garbageTypes: [
                            'BOTTLES'
                        ]
                    }
                }
            })
        })
        it('should return valid object [fully usage]', () => {
            const parameter = PayloadBuilder
                .setCollectionDayOfWeek('MONDAY')
                .addGarbageType('BOTTLES')
                .addGarbageType('BULKY')
                .addGarbageType('CANS')
                .getParameter()
            expect(parameter).toEqual({
                name: 'AMAZON.TrashCollectionAlert.Activated',
                payload: {
                    alert: {
                        collectionDayOfWeek: 'MONDAY',
                        garbageTypes: [
                            'BOTTLES',
                            'BULKY',
                            'CANS'
                        ]
                    }
                }
            })
        })
    })
})
