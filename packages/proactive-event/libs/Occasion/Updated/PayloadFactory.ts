import moment from 'moment'
import {
    interfaces,
    Types
} from '../../model'

// helper
import {
    getOccasion
} from '../../helpers'
import Occasion = interfaces.Occasion
import PayloadBuilder = Occasion.Updated.PayloadBuilder

export default class ParameterFactory {
    public static init (): PayloadBuilder {
        const eventName = 'AMAZON.Occasion.Updated'
        const confirmationState: Types.ConfirmationState = {
            confirmationStatus: 'CONFIRMED'
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const occasion: any = {
            broker: {
                name: 'localizedattribute:brokerName'
            },
            provider: {
                name: 'localizedattribute:providerName'
            }
        }
        return {
            updateConfirmationStatus (status: Types.ConfirmationStatus) {
                confirmationState.confirmationStatus = status
                return this
            },
            getConfirmationState (): Types.ConfirmationState {
                return confirmationState
            },
            getConfirmationStatus (): Types.ConfirmationStatus {
                return confirmationState.confirmationStatus
            },
            setOccasionType (type: Types.OccasionType) {
                occasion.occasionType = type
                return this
            },
            setSubject (subject: string) {
                occasion.subject = subject
                return this
            },
            setProviderName (name: string) {
                occasion.provider.name = name
                return this
            },
            setBookingTime (date: Date) {
                occasion.bookingTime = moment(date).toISOString()
                return this
            },
            setBrokerName (name: string) {
                occasion.broker.name = name
                return this
            },
            getEventName () {
                return eventName
            },
            getPayload () {
                return {
                    state: confirmationState,
                    occasion: getOccasion(occasion)
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
