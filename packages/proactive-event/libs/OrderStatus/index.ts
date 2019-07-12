import UpdatedPayloadFactory from './Updated/PayloadFactory'

const OrderStatus = {
    Updated: {
        PayloadFactory: UpdatedPayloadFactory,
        PayloadBuilder: UpdatedPayloadFactory.init()
    }
}
export default OrderStatus
