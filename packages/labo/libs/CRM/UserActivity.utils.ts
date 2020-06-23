import { UserActivityConfig } from './UserActivity.interface'

export const getUnixTime = (date: Date = new Date()): number => {
    return Math.floor(date.getTime() / 1000)
}

export const defaultUserActivityConfig: UserActivityConfig = {
    returnedUserDays: 30
}
