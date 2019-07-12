import {
    interfaces,
    Types,
    event
} from '../../model'

// helper
import SportsEvent = interfaces.SportsEvent
import PayloadBuilder = SportsEvent.Updated.PayloadBuilder

export default class ParameterFactory {
    public static init (): PayloadBuilder {
        const eventName = 'AMAZON.SportsEvent.Updated'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const eventLeague: Types.Soccer = {
            name: 'localizedattribute:eventLeagueName'
        }
        const homeTeamStatistic: Types.GameStatistic = {
            team: {
                name: ''
            },
            score: 0
        }
        const awayTeamStatistic: Types.GameStatistic = {
            team: {
                name: ''
            },
            score: 0
        }
        let updated: Types.Goal | null = null
        return {
            updateGoalData (teamName: string, score: number) {
                if (updated === null) {
                    updated = {
                        scoreEarned: score,
                        teamName
                    }
                }
                updated.scoreEarned = score
                updated.teamName = teamName
                return this
            },
            setEventLeagueName (name: string) {
                eventLeague.name = name
                return this
            },
            setHomeTeamStatistic (teamName: string, score: number) {
                homeTeamStatistic.team.name = teamName
                homeTeamStatistic.score = score
                return this
            },
            setAwayTeamStatistic (teamName: string, score: number) {
                awayTeamStatistic.score = score
                awayTeamStatistic.team.name = teamName
                return this
            },
            getEventName () {
                return eventName
            },
            getPayload () {
                const payload: event.SportsEvent.Updated.Payload = {
                    sportsEvent: {
                        eventLeague,
                        homeTeamStatistic,
                        awayTeamStatistic
                    }
                }

                if (updated !== null && updated.hasOwnProperty('scoreEarned') && updated.hasOwnProperty('teamName')) payload.update = updated
                return payload
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
