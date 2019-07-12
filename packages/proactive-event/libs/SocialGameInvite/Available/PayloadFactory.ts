import {
    interfaces,
    Types
} from '../../model'

// helper
import {
    getGame,
    getGameInvite
} from '../../helpers'
import SocialGameInvite = interfaces.SocialGameInvite
import PayloadBuilder = SocialGameInvite.Available.PayloadBuilder

export default class ParameterFactory {
    public static init (): PayloadBuilder {
        const eventName = 'AMAZON.SocialGameInvite.Available'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const invite: any = {
            inviter: {
                name: ''
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const game: any = {
            name: 'localizedattribute:gameName'
        }
        return {
            setInviterName (name: string) {
                invite.inviter.name = name
                return this
            },
            setRelationshipToInvitee (relation: Types.RelationshipToInvitee) {
                invite.relationshipToInvitee = relation
                return this
            },
            setInviteType (type: Types.InviteType) {
                invite.inviteType = type
                return this
            },
            setGameOfferName (name: Types.OfferType) {
                game.offer = name
                return this
            },
            setGameName (name: string) {
                game.name = name
                return this
            },
            getEventName () {
                return eventName
            },
            getPayload () {
                return {
                    invite: getGameInvite(invite),
                    game: getGame(game)
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
