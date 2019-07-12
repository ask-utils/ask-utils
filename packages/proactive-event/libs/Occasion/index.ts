import UpdatedPayloadFactory from './Updated/PayloadFactory'

const Occasion = {
    Updated: {
        PayloadFactory: UpdatedPayloadFactory,
        PayloadBuilder: UpdatedPayloadFactory.init()
    }
}
export default Occasion
