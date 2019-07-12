import { services } from 'ask-sdk-model'
import Client from './client'

export class SettingAPIClient extends Client {
    protected path = '/v2/devices/'
    public async getTimezone (deviceId: string): Promise<string> {
        return this.get(`${deviceId}/settings/System.timeZone`)
    }
    public async getTempratureUnit (deviceId: string): Promise<services.ups.TemperatureUnit> {
        return this.get(`${deviceId}/settings/System.temperatureUnit`)
    }
    public async getDistanceUnits (deviceId: string): Promise<services.ups.DistanceUnits> {
        return this.get(`${deviceId}/settings/System.distanceUnits`)
    }
}
