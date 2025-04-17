import {User} from "./User";
import {Attachment} from "./Attachment";
import {UserDataType} from "../enums/UserDataType";
import {Client} from "./Client";

/**
 * A message constructed from a quote
 */
export class QuoteMessage {
    /**
     * {@link Date} the quoted message was sent at
     */
    public createdAt: Date;

    /**
     * Timestamp the quoted message was sent at
     */
    public createdTimestamp: number;

    /**
     * Author of the quoted message
     */
    public author: User;

    /**
     * Text of the quoted message
     */
    public content?: string;

    /**
     * Attachments in the quoted message
     */
    public attachments?: Attachment[];

    /**
     * @param quoteData - Data to reconstruct the quoted message
     * @param client
     * @internal
     */
    constructor(quoteData: any, client: Client) {
        this.author = new User(quoteData, UserDataType.Quote, client);
        this.content = quoteData.text && quoteData.text.trim().length > 0 ? quoteData.text : null;
        this.attachments = quoteData.attachments?.map(i => new Attachment(i));
        this.createdTimestamp = quoteData.id;
        this.createdAt = new Date(quoteData.id);
    }
}