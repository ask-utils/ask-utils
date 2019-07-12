import { services } from 'ask-sdk-model'
import Client from './client'

export class DeviceAPIClient extends Client {
    protected path = '/v1/devices/'
    public async getCountryAndPostalCode (deviceId: string): Promise<services.deviceAddress.ShortAddress> {
        return this.get(`${deviceId}/settings/address/countryAndPostalCode`)
    }
    public async getFullAddress (deviceId: string): Promise<services.deviceAddress.Address> {
        return this.get(`${deviceId}/settings/address`)
    }
}
