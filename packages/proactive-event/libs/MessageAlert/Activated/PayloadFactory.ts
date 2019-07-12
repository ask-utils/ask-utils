import {
    interfaces
} from '../../model'

// helper
import {
    getMessageState,
    getMessageGroup
} from '../../helpers'
import MessageAlert = interfaces.MessageAlert
import PayloadBuilder = MessageAlert.Activated.PayloadBuilder

export default class ParameterFactory {
    public static init (): PayloadBuilder {
        const eventName = 'AMAZON.MessageAlert.Activated'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const state: any = {}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const group: any = {}
        return {
            setMessageCreator (name) {
                const person = {
                    name
                }
                group.creator = person
                return this
            },
            setMessageCount (count) {
                group.count = count
                return this
            },
            setMessageUrgency (urgency = 'URGENT') {
                group.urgency = urgency
                return this
            },
            setMessageFreshness (freshness) {
                state.freshness = freshness
                return this
            },
            setMessageStatus (messageStatus) {
                state.status = messageStatus
                return this
            },
            getEventName () {
                return eventName
            },
            getPayload () {
                return {
                    state: getMessageState(state),
                    messageGroup: getMessageGroup(group)
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
