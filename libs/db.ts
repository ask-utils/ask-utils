import { DynamoDB } from 'aws-sdk'
import DocumentClient = DynamoDB.DocumentClient

export interface DBItem {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}
export interface DBConfig {
    client?: DocumentClient;
    isDebug?: boolean;
    primaryKey?: string;
}
export default class DBClient {
    protected client: DocumentClient
    protected isDebug: boolean
    protected tableName: string
    protected primaryKey: string
    public constructor (tableName: string, config?: DBConfig) {
        this.client = config ? config.client || new DocumentClient() : new DocumentClient()
        this.isDebug = config ? config.isDebug || false : false
        this.primaryKey = config ? config.primaryKey || 'id' : 'id'
        this.tableName = tableName
    }
    public async get (id: string): Promise<DBItem> {
        const param: DocumentClient.GetItemInput = {
            TableName: this.tableName,
            Key: {
                [this.primaryKey]: id
            }
        }
        if (this.isDebug) console.log('DBClient.get: %j', param)
        const { Item } = await this.client.get(param).promise()
        if (this.isDebug) console.log('DBClient.get(): %j', Item)
        if (!Item) return {}
        return Item
    }
    public async put (id: string, attributes: DBItem): Promise<DocumentClient.PutItemOutput> {
        const param: DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item: {
                [this.primaryKey]: id,
                ...attributes
            }
        }
        if (this.isDebug) console.log('DBClient.put: %j', param)
        const result = await this.client.put(param).promise()
        if (this.isDebug) console.log('DBClient.put: %j', result)
        return result
    }
}
