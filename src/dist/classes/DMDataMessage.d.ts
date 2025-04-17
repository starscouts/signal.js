import { User } from "./User";
import { DMMessage } from "./DMMessage";
import { Client } from "./Client";
import { DataMessage } from "./DataMessage";
import { Attachment } from "./Attachment";
import { QuoteMessage } from "./QuoteMessage";
import { MessageFormatting } from "./MessageFormatting";
import { UserMention } from "./UserMention";
import { IReceivedMessageURLPreview } from "../types/IReceivedMessageURLPreview";
import { IChatMessageOptions } from "../types/IChatMessageOptions";
import { SentDataMessage } from "./SentDataMessage";
/**
 * A data (text) message sent in a {@link DM}
 */
export declare class DMDataMessage extends DMMessage implements DataMessage {
    /**
     * Message text
     */
    content?: string;
    /**
     * {@link Attachment}s associated with the message
     */
    attachments: Attachment[];
    /**
     * Mentions in the message
     */
    mentions: UserMention[];
    /**
     * URL previews present in the message
     */
    previews: IReceivedMessageURLPreview[];
    /**
     * Formatting rules collection for this message
     */
    formatting: MessageFormatting;
    /**
     * Quoted message, if applicable
     */
    quote?: QuoteMessage;
    /**
     * @param user - The author of the message
     * @param data - Data associated with the message
     * @param time - The timestamp the message was sent at
     * @param client
     * @internal
     */
    constructor(user: User, data: any, time: number, client: Client);
    /**
     * Mark the message as read
     */
    markAsRead(): Promise<void>;
    /**
     * Mark the message as viewed
     */
    markAsViewed(): Promise<void>;
    /**
     * Reply to (quote) the message
     * @param text - The text of the reply
     * @param options - The options used to build the reply message
     */
    reply(text: string, options?: IChatMessageOptions): Promise<SentDataMessage>;
}
