import {
    interfaces
} from '../../model'

// helper
import {
    getWeatherAlert
} from '../../helpers'
import WeatherAlert = interfaces.WeatherAlert
import PayloadBuilder = WeatherAlert.Activated.PayloadBuilder

export default class ParameterFactory {
    public static init (): PayloadBuilder {
        const eventName = 'AMAZON.WeatherAlert.Activated'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const weatherAlert: any = {}
        return {
            setAlertSource (source: string = 'localizedattribute:source') {
                weatherAlert.source = source
                return this
            },
            setAlertType (type) {
                weatherAlert.alertType = type
                return this
            },
            getEventName () {
                return eventName
            },
            getPayload () {
                return {
                    weatherAlert: getWeatherAlert(weatherAlert)
                }
            },
            getParameter () {
                return {
                    name: eventName,
                    payload: this.getPayload()
                }
            }
        }
    }
}
