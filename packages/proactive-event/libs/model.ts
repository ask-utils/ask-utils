/* eslint-disable import/export */

export namespace Types {
    export type Locale = 'de-DE' | 'en-AU' | 'en-CA' | 'en-GB' | 'en-IN' | 'en-US' | 'es-ES' | 'es-MX' | 'fr-CA' | 'fr-FR' | 'it-IT' | 'ja-JP'
    export type dateTime = string
    export interface Person {
        name: string;
    }
    export type MediaType = 'BOOK' | 'EPISODE' | 'ALBUM' | 'SINGLE' | 'MOVIE' | 'GAME'
    export type DistributionMethod = 'STREAM' | 'AIR' | 'RELEASE' | 'PREMIERE' | 'DROP'
    export interface Thing {
        name: 'localizedattribute:providerName';
    }
    export interface Availability {
        startTime: Types.dateTime;
        provider?: Thing;
        method: DistributionMethod;
    }
    export interface CreativeWork {
        name: string; // "localizedattribute:contentName",
        contentType: MediaType;
    }
    export type OfferType = 'MATCH' | 'REMATCH' | 'GAME'
    export type InviteType = 'CHALLENGE' | 'INVITE'
    export type RelationshipToInvitee = 'FRIEND' | 'CONTACT'
    export interface GameInvite {
        inviter: Person;
        relationshipToInvitee: RelationshipToInvitee;
        inviteType: InviteType;
    }
    export interface Game {
        offer: OfferType;
        name: string; // 'localizedattribute:gameName';
    }

    export type ConfirmationStatus = 'CONFIRMED' | 'CANCELED' | 'RESCHEDULED' | 'REQUESTED' | 'CREATED' | 'UPDATED'
    export type OccasionType = 'RESERVATION_REQUEST' | 'RESERVATION' | 'APPOINTMENT_REQUEST' | 'APPOINTMENT'
    export interface ConfirmationState {
        confirmationStatus: ConfirmationStatus;
    }
    export interface Ogranization {
        name: string; // 'localizedattribute:providerName';
    }
    export interface Skill {
        name: string; // 'localizedattribute:brokerName';
    }
    export interface Occasion {
        occasionType: OccasionType;
        subject: string; // "localizedattribute:subject",
        provider: Ogranization;
        bookingTime: Types.dateTime; // "2018-11-20T19:16:31Z",
        broker?: Skill;
    }
    export interface ParcelDelivery {
        expectedArrival: Types.dateTime; // "2018-12-14T23:32:00.463Z"
    }
    export interface OrderState {
        status: OrderStatus;
        enterTimestamp?: Types.dateTime; // "20180916T030000Z   2018-09-16T03:00:00.463Z"
        deliveryDetails?: ParcelDelivery;
    }
    export interface Order {
        seller: {
            name: string; // 'localizedattribute:sellerName';
        };
    }
    export type OrderStatus = 'PREORDER_RECEIVED' | 'ORDER_RECEIVED' | 'ORDER_PREPARING' | 'ORDER_SHIPPED' | 'ORDER_OUT_FOR_DELIVERY' | 'ORDER_OUT_FOR_DELIVERY' | 'ORDER_DELIVERED'
    export type GarbageType = 'BOTTLES' | 'BULKY' | 'BURNABLE' | 'CANS' | 'CLOTHING' | 'COMPOSTABLE' | 'CRUSHABLE' | 'GARDEN_WASTE' | 'GLASS' | 'HAZARDOUS' | 'HOME_APPLIANCES' | 'KITCHEN_WASTE' | 'LANDFILL' | 'PET_BOTTLES' | 'RECYCLABLE_PLASTICS' | 'WASTE_PAPER'
    export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'
    export interface TrashCollectionAlert {
        garbageTypes: GarbageType[];
        collectionDayOfWeek: DayOfWeek;
    }
    export type WeatherAlertType = 'TORNADO' | 'HURRICANE' | 'SNOW_STORM' | 'THUNDER_STORM'
    export interface WeatherAlert {
        source?: string; // 'localizedattribute:source';
        alertType: WeatherAlertType;
    }

    export interface Goal {
        scoreEarned: number;
        teamName: string;
    }
    export interface SportsEvent {
        eventLeague: Soccer;
        homeTeamStatistic: GameStatistic;
        awayTeamStatistic: GameStatistic;
    }
    export interface SportsTeam {
        name: string;
    }
    export interface GameStatistic {
        team: SportsTeam;
        score: number;
    }
    export interface Soccer {
        name: string;
    }

    export interface MessageState {
        status: MessageStatus;
        freshness?: MessageFreshness;
    }
    export type MessageStatus = 'UNREAD' | 'FLAGGED'
    export type MessageFreshness = 'NEW' | 'OVERDUE'
    export type MessageUrgent = 'URGENT'
    export interface MessageGroup {
        creator: Types.Person;
        count: number;
        urgency?: MessageUrgent;
    }
    export interface LocalizedAttribute {
        locale: Locale;
        [name: string]: string;
    }
    export type LocalizedAttributes = LocalizedAttribute[]
}

export namespace event {
    export interface Props<E = EventName, P = Payload> {
        name: E;
        payload: P;
    }
    export type EventName = WeatherAlert.EventName | SportsEvent.EventName | MessageAlert.EventName | OrderStatus.EventName | Occasion.EventName | MediaContent.EventName | SocialGameInvite.EventName | TrashCollectionAlert.EventName
    export type Payload = TrashCollectionAlert.Payload | WeatherAlert.Payload | SportsEvent.Payload | MessageAlert.Payload | OrderStatus.Payload | Occasion.Payload | MediaContent.Payload | SocialGameInvite.Payload
    export namespace TrashCollectionAlert {
        export type EventName = Activated.EventName
        export type Payload = Activated.Payload
        export namespace Activated {
            export type EventName = 'AMAZON.TrashCollectionAlert.Activated'
            export interface Payload {
                alert: Types.TrashCollectionAlert;
            }
        }
    }
    export namespace WeatherAlert {
        export type EventName = Activated.EventName
        export type Payload = Activated.Payload
        export namespace Activated {
            export type EventName = 'AMAZON.WeatherAlert.Activated'
            export interface Payload {
                weatherAlert: Types.WeatherAlert;
            }
        }
    }
    export namespace SportsEvent {
        export type EventName = Updated.EventName
        export type Payload = Updated.Payload
        export namespace Updated {
            export type EventName = 'AMAZON.SportsEvent.Updated'
            export interface Payload {
                update?: Types.Goal;
                sportsEvent: Types.SportsEvent;
            }
        }
    }
    export namespace MessageAlert {
        export type EventName = Activated.EventName
        export type Payload = Activated.Payload
        export namespace Activated {
            export type EventName = 'AMAZON.MessageAlert.Activated'
            export interface Payload {
                state: Types.MessageState;
                messageGroup: Types.MessageGroup;
            }
        }
    }
    export namespace OrderStatus {
        export type EventName = Updated.EventName
        export type Payload = Updated.Payload
        export namespace Updated {
            export type EventName = 'AMAZON.OrderStatus.Updated'
            export interface Payload {
                state: Types.OrderState;
                order: Types.Order;
            }
        }
    }
    export namespace Occasion {
        export type EventName = Updated.EventName
        export type Payload = Updated.Payload
        export namespace Updated {
            export type EventName = 'AMAZON.Occasion.Updated'
            export interface Payload {
                state: Types.ConfirmationState;
                occasion: Types.Occasion;
            }
        }
    }
    export namespace MediaContent {
        export type EventName = Available.EventName
        export type Payload = Available.Payload
        export namespace Available {
            export type EventName = 'AMAZON.MediaContent.Available'
            export interface Payload {
                availability: Types.Availability;
                content: Types.CreativeWork;
            }
        }
    }
    export namespace SocialGameInvite {
        export type EventName = Available.EventName
        export type Payload = Available.Payload
        export namespace Available {
            export type EventName = 'AMAZON.SocialGameInvite.Available'
            export interface Payload {
                invite: Types.GameInvite;
                game: Types.Game;
            }
        }
    }
}

export namespace client {
    export interface Class {
        getAccessToken: Promise<client.AuthResponse>;
    }
    export type ClientId = string
    export type ClientSecret = string
    export type APIURL = 'https://api.amazonalexa.com/v1/proactiveEvents/' | 'https://api.eu.amazonalexa.com/v1/proactiveEvents/' | 'https://api.fe.amazonalexa.com/v1/proactiveEvents/'
    export type DevAPIURL = 'https://api.amazonalexa.com/v1/proactiveEvents/stages/development' | 'https://api.eu.amazonalexa.com/v1/proactiveEvents/stages/development' | 'https://api.fe.amazonalexa.com/v1/proactiveEvents/stages/development'
    export type APIEndpoint = APIURL | DevAPIURL
    export type ApiRegion = 'FE' | 'US' | 'EU'
    export interface ClientConfig {
        clientId: ClientId;
        clientSecret: ClientSecret;
        apiEndpont?: APIEndpoint;
        apiRegion?: ApiRegion;
        isProduction?: boolean;
    }
    export interface AuthResponse {
        'access_token': string;
        'expires_in': number;
        'scope': 'alexa::proactive_events';
        'token_type': 'Bearer';
    }
    export type AudienceType = 'Unicast' | 'Multicast'
    export interface AudiencePayload {
        user: string;
    }
    export interface RelevantAudience {
        type: AudienceType;
        payload?: AudiencePayload;
    }
    export interface RequstBody {
        timestamp: string;
        expiryTime: string;
        event: {
            payload: event.Payload;
            name: event.EventName;
            relevantAudience: RelevantAudience;
            refereneId: string;
        };
    }
    export interface Response {
        statusCode: number;
        message: string;
        request: RequstBody;
    }
}

export namespace interfaces {
    export interface PayloadBuilder {
        getEventName(): event.EventName;
        getParameter(): event.Props;
    }
    export namespace LocalizedAttributes {
        export interface Factory {
            putLocalizedAttribute(locale: Types.Locale, key: string, text: string): Factory;
            getLocalizedAttributes(): Types.LocalizedAttributes;
        }
    }
    export namespace TrashCollectionAlert {
        export type PayloadBuilder = Activated.PayloadBuilder
        export namespace Activated {
            export interface PayloadBuilder {
                putAlert(alert: Types.TrashCollectionAlert): PayloadBuilder;
                putGarbageTypes(garbageTypes: Types.GarbageType[]): PayloadBuilder;
                addGarbageType(garbageType: Types.GarbageType): PayloadBuilder;
                setCollectionDayOfWeek(collectionDayOfWeek: Types.DayOfWeek): PayloadBuilder;
                getEventName(): event.TrashCollectionAlert.Activated.EventName;
                getPayload(): event.TrashCollectionAlert.Payload;
                getParameter(): event.Props<event.TrashCollectionAlert.EventName, event.TrashCollectionAlert.Payload>;
            }
        }
    }
    export namespace WeatherAlert {
        export type PayloadBuilder = Activated.PayloadBuilder
        export namespace Activated {
            export interface PayloadBuilder extends interfaces.PayloadBuilder {
                setAlertSource(source?: string): PayloadBuilder;
                setAlertType(type: Types.WeatherAlertType): PayloadBuilder;
                getEventName (): event.WeatherAlert.Activated.EventName;
                getParameter(): event.Props<event.WeatherAlert.Activated.EventName, event.WeatherAlert.Activated.Payload>;
                getPayload(): event.WeatherAlert.Activated.Payload;
            }
        }
    }
    export namespace SportsEvent {
        export type PayloadBuilder = Updated.PayloadBuilder
        export namespace Updated {
            export interface PayloadBuilder extends interfaces.PayloadBuilder {
                updateGoalData(teamName: string, score: number): PayloadBuilder;
                setEventLeagueName(name: string): PayloadBuilder;
                setHomeTeamStatistic(teamName: string, score: number): PayloadBuilder;
                setAwayTeamStatistic(teamName: string, score: number): PayloadBuilder;
                getEventName(): event.SportsEvent.Updated.EventName;
                getParameter(): event.Props<event.SportsEvent.Updated.EventName, event.SportsEvent.Updated.Payload>;
                getPayload(): event.SportsEvent.Updated.Payload;
            }
        }
    }
    export namespace MessageAlert {
        export type PayloadBuilder = Activated.PayloadBuilder
        export namespace Activated {
            export interface PayloadBuilder extends interfaces.PayloadBuilder {
                setMessageCreator(name: string): PayloadBuilder;
                setMessageCount(count: number): PayloadBuilder;
                setMessageUrgency(urgency?: Types.MessageUrgent): PayloadBuilder;
                setMessageFreshness(freshness: Types.MessageFreshness): PayloadBuilder;
                setMessageStatus(messageStatus: Types.MessageStatus): PayloadBuilder;
                getEventName (): event.MessageAlert.Activated.EventName;
                getParameter(): event.Props<event.MessageAlert.Activated.EventName, event.MessageAlert.Activated.Payload>;
                getPayload(): event.MessageAlert.Payload;
            }
        }
    }
    export namespace OrderStatus {
        export type PayloadBuilder = Updated.PayloadBuilder
        export namespace Updated {
            export interface PayloadBuilder extends interfaces.PayloadBuilder {
                setOrderStatus(status: Types.OrderStatus): PayloadBuilder;
                setEnterTimestamp(date: Date): PayloadBuilder;
                setExpectedArrival(date: Date): PayloadBuilder;
                updateSellerName(name: string): PayloadBuilder;
                getEventName(): event.OrderStatus.EventName;
                getPayload(): event.OrderStatus.Updated.Payload;
                getParameter(): event.Props<event.OrderStatus.Updated.EventName, event.OrderStatus.Updated.Payload>;
            }
        }
    }
    export namespace Occasion {
        export type PayloadBuilder = Updated.PayloadBuilder
        export namespace Updated {
            export interface PayloadBuilder extends interfaces.PayloadBuilder {
                updateConfirmationStatus(status: Types.ConfirmationStatus): PayloadBuilder;
                setOccasionType(type: Types.OccasionType): PayloadBuilder;
                setSubject(subject: string): PayloadBuilder;
                setProviderName(name: string): PayloadBuilder;
                setBookingTime(date: Date): PayloadBuilder;
                setBrokerName(name: string): PayloadBuilder;
                getEventName(): event.Occasion.Updated.EventName;
                getConfirmationState(): Types.ConfirmationState;
                getConfirmationStatus(): Types.ConfirmationStatus;
                getPayload(): event.Occasion.Payload;
                getParameter(): event.Props<event.Occasion.Updated.EventName, event.Occasion.Updated.Payload>;
            }
        }
    }
    export namespace MediaContent {
        export namespace Available {
            export interface PayloadBuilder {
                setContentName(name?: string): PayloadBuilder;
                setMediaType(type: Types.MediaType): PayloadBuilder;
                getEventName(): event.MediaContent.EventName;
                setStartTime(date: Date): PayloadBuilder;
                setDistributionMethod(method: Types.DistributionMethod): PayloadBuilder;
                setProvider(providerName: string): PayloadBuilder;
                getPayload(): event.MediaContent.Payload;
                getParameter(): event.Props<event.MediaContent.EventName, event.MediaContent.Available.Payload>;
            }
        }
    }
    export namespace SocialGameInvite {
        export namespace Available {
            export interface PayloadBuilder extends interfaces.PayloadBuilder {
                setInviterName(name: string): PayloadBuilder;
                setRelationshipToInvitee(relation: Types.RelationshipToInvitee): PayloadBuilder;
                setInviteType(type: Types.InviteType): PayloadBuilder;
                setGameName(name: string): PayloadBuilder;
                setGameOfferName(name: Types.OfferType): PayloadBuilder;
                getEventName(): event.SocialGameInvite.Available.EventName;
                getPayload(): event.SocialGameInvite.Available.Payload;
            }
        }
    }
}
