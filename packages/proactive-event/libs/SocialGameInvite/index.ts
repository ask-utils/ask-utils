import AvailablePayloadFactory from './Available/PayloadFactory'

const SocialGameInvite = {
    Available: {
        PayloadFactory: AvailablePayloadFactory,
        PayloadBuilder: AvailablePayloadFactory.init()
    }
}
export default SocialGameInvite
