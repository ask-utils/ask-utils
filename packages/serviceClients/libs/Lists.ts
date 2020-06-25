import { services } from 'ask-sdk-model'
import Client from './client'
import listManagement = services.listManagement
type ListStatus = 'active' | 'completed'
export class ListManagementAPIClient extends Client {
    protected path = 'v2/householdlists/'
    public async getProfileName (): Promise<string> {
        return this.get('Profile.name')
    }

    public async getListsMetadata (): Promise<listManagement.AlexaListsMetadata> {
        return this.get()
    }

    public async getList (listId: string, status: ListStatus): Promise<listManagement.AlexaList> {
        return this.get(`${listId}/${status}`)
    }

    public async createList (request: listManagement.CreateListRequest): Promise<listManagement.AlexaListsMetadata> {
        return this.post(request)
    }

    public async updateList (listId: string, request: listManagement.UpdateListRequest): Promise<listManagement.AlexaListsMetadata> {
        return this.put(request, listId)
    }

    public async deleteList (listId: string): Promise<void> {
        await this.delete(listId)
    }

    public async getListItem (listId: string, itemId: string): Promise<listManagement.AlexaListItem> {
        return this.get(`${listId}/items/${itemId}`)
    }

    public async createListItem (listId: string, request: listManagement.CreateListItemRequest): Promise<listManagement.AlexaListItem> {
        return this.post(request, `${listId}/items/`)
    }

    public async updateListItem (listId: string, itemId: string, request: listManagement.UpdateListItemRequest): Promise<listManagement.AlexaListItem> {
        return this.put(request, `${listId}/items/${itemId}`)
    }

    public async deleteListItem (listId: string, itemId: string): Promise<void> {
        await this.delete(`${listId}/items/${itemId}`)
    }
}
