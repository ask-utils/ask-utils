import UpdatedPayloadFactory from './Updated/PayloadFactory'

const SportsEvent = {
    Updated: {
        PayloadFactory: UpdatedPayloadFactory,
        PayloadBuilder: UpdatedPayloadFactory.init()
    }
}
export default SportsEvent
