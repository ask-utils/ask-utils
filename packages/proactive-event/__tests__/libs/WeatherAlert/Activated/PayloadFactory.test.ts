import ParameterFactory from '../../../../libs/WeatherAlert/Activated/PayloadFactory'

describe('/libs/WeatherAlert/Activated/PayloadFactory.test.ts', () => {
    it('should not throw error when init the class', () => {
        expect(() => ParameterFactory.init()).not.toThrow()
    })
    let PayloadBuilder = ParameterFactory.init()
    beforeEach(() => PayloadBuilder = ParameterFactory.init())
    describe('getEventName()', () => {
        it('should return false when given string', () => {
            expect(PayloadBuilder.getEventName()).toEqual('AMAZON.WeatherAlert.Activated')
        })
    })
    describe('getParameter', () => {
        it('should return valid object [simple usage]', () => {
            const parameter = PayloadBuilder
                .setAlertType('HURRICANE')
                .getParameter()
            expect(parameter).toEqual({
                name: 'AMAZON.WeatherAlert.Activated',
                payload: {
                    weatherAlert: {
                        alertType: 'HURRICANE'
                    }
                }
            })
        })
        it('should return valid object [full usage]', () => {
            const parameter = PayloadBuilder
                .setAlertType('HURRICANE')
                .setAlertSource('example source')
                .getParameter()
            expect(parameter).toEqual({
                name: 'AMAZON.WeatherAlert.Activated',
                payload: {
                    weatherAlert: {
                        source: 'example source',
                        alertType: 'HURRICANE'
                    }
                }
            })
        })
    })
})
