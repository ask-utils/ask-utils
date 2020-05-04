import {
    User
} from 'ask-sdk-model' // 'ask-sdk-core/node_modules/ask-sdk-model'

export class UserFactory {
    private user: User = {
        userId: ''
    }
    public putUserId (userId: string): this {
        this.user.userId = userId
        return this
    }

    public putUser (user: User): this {
        this.user = user
        return this
    }

    public getUser (): User {
        return this.user
    }
}
