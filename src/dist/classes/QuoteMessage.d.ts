import { User } from "./User";
import { Attachment } from "./Attachment";
import { Client } from "./Client";
/**
 * A message constructed from a quote
 */
export declare class QuoteMessage {
    /**
     * {@link Date} the quoted message was sent at
     */
    createdAt: Date;
    /**
     * Timestamp the quoted message was sent at
     */
    createdTimestamp: number;
    /**
     * Author of the quoted message
     */
    author: User;
    /**
     * Text of the quoted message
     */
    content?: string;
    /**
     * Attachments in the quoted message
     */
    attachments?: Attachment[];
    /**
     * @param quoteData - Data to reconstruct the quoted message
     * @param client
     * @internal
     */
    constructor(quoteData: any, client: Client);
}
