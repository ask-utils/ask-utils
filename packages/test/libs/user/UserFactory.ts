import {
    User
} from 'ask-sdk-core/node_modules/ask-sdk-model'

export class UserFactory {
    private readonly user: User = {
        userId: ''
    }
    public putUserId (userId: string): this {
        this.user.userId = userId
        return this
    }

    public getUser (): User {
        return this.user
    }
}
