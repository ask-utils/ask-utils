import moment from 'moment'
import {
    interfaces,
    Types
} from '../../model'

// helper
import {
    getOrderState
} from '../../helpers'
import OrderStatus = interfaces.OrderStatus
import PayloadBuilder = OrderStatus.Updated.PayloadBuilder

export default class ParameterFactory {
    public static init (): PayloadBuilder {
        const eventName = 'AMAZON.OrderStatus.Updated'

        const order: Types.Order = {
            seller: {
                name: 'localizedattribute:sellerName'
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const orderState: any = {}
        return {
            setOrderStatus (status: Types.OrderStatus) {
                orderState.status = status
                return this
            },
            setEnterTimestamp (date: Date) {
                orderState.enterTimestamp = moment(date).toISOString()
                return this
            },
            setExpectedArrival (date: Date) {
                orderState.deliveryDetails = {
                    expectedArrival: moment(date).toISOString()
                }
                return this
            },
            updateSellerName (name: string) {
                order.seller.name = name
                return this
            },
            getEventName () {
                return eventName
            },
            getPayload () {
                return {
                    state: getOrderState(orderState),
                    order
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
