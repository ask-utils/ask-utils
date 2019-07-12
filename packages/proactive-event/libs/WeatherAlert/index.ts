import ActivatedPayloadFactory from './Activated/PayloadFactory'

const WeatherAlert = {
    Activated: {
        PayloadFactory: ActivatedPayloadFactory,
        PayloadBuilder: ActivatedPayloadFactory.init()
    }
}
export default WeatherAlert
