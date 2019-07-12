import { services } from 'ask-sdk-model'
import Client from './client'

export class UserProfileAPIClient extends Client {
    protected path = '/v2/accounts/~current/settings'
    public async getProfileName (): Promise<string> {
        return this.get('Profile.name')
    }
    public async getGivenName (): Promise<string> {
        return this.get('Profile.givenName')
    }
    public async getEmail (): Promise<string> {
        return this.get('Profile.email')
    }
    public async getMobileNumber (): Promise<services.ups.PhoneNumber> {
        return this.get('Profile.mobileNumber')
    }
}
