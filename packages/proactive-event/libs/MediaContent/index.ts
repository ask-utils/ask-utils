import AvailablePayloadFactory from './Available/PayloadFactory'

const MediaContent = {
    Available: {
        PayloadFactory: AvailablePayloadFactory,
        PayloadBuilder: AvailablePayloadFactory.init()
    }
}
export default MediaContent
