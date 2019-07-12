import {
    interfaces,
    Types,
    event
} from '../../model'
import TrashCollectionAlert = interfaces.TrashCollectionAlert
import PayloadBuilder = TrashCollectionAlert.Activated.PayloadBuilder

export default class ParameterFactory {
    public static init (): PayloadBuilder {
        const eventName = 'AMAZON.TrashCollectionAlert.Activated'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let alert: any = {}
        return {
            putAlert (alertItem: Types.TrashCollectionAlert): PayloadBuilder {
                alert = alertItem
                return this
            },
            putGarbageTypes (garbageTypes: Types.GarbageType[]): PayloadBuilder {
                alert.garbageTypes = garbageTypes
                return this
            },
            addGarbageType (garbageType: Types.GarbageType): PayloadBuilder {
                if (alert.garbageTypes && alert.garbageTypes.length > 0) {
                    alert.garbageTypes.push(garbageType)
                } else {
                    alert.garbageTypes = [garbageType]
                }
                return this
            },
            setCollectionDayOfWeek (collectionDayOfWeek: Types.DayOfWeek): PayloadBuilder {
                alert.collectionDayOfWeek = collectionDayOfWeek
                return this
            },
            getEventName () {
                return eventName
            },
            getPayload (): event.TrashCollectionAlert.Activated.Payload {
                return {
                    alert
                }
            },
            getParameter (): event.Props<event.TrashCollectionAlert.EventName, event.TrashCollectionAlert.Activated.Payload> {
                return {
                    name: eventName,
                    payload: this.getPayload()
                }
            }
        }
    }
}
