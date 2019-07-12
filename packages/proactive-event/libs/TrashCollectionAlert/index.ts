import ActivatedPayloadFactory from './Activated/PayloadFactory'

const TrashCollectionAlert = {
    Activated: {
        PayloadFactory: ActivatedPayloadFactory,
        PayloadBuilder: ActivatedPayloadFactory.init()
    }
}
export default TrashCollectionAlert
