import { User } from "./User";
import { GroupMessage } from "./GroupMessage";
import { DataMessage } from "./DataMessage";
import { Attachment } from "./Attachment";
import { QuoteMessage } from "./QuoteMessage";
import { MessageFormatting } from "./MessageFormatting";
import { UserMention } from "./UserMention";
import { IReceivedMessageURLPreview } from "../types/IReceivedMessageURLPreview";
import { IChatMessageOptions } from "../types/IChatMessageOptions";
import { SentDataMessage } from "./SentDataMessage";
/**
 * A data (text) message sent in a {@link Group}
 */
export declare class GroupDataMessage extends GroupMessage implements DataMessage {
    /**
     * Message text
     */
    content?: string;
    /**
     * Attachments associated with the message
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
     * @param groupId - The group the message was sent in
     * @param client
     * @internal
     */
    constructor(user: User, data: any, time: number, groupId: string, client: any);
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
    /**
     * Delete the message
     */
    delete(): Promise<void>;
}
