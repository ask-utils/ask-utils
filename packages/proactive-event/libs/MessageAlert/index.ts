import ActivatedPayloadFactory from './Activated/PayloadFactory'

const MessageAlert = {
    Activated: {
        PayloadFactory: ActivatedPayloadFactory,
        PayloadBuilder: ActivatedPayloadFactory.init()
    }
}
export default MessageAlert
