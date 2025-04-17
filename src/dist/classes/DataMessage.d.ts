import { Attachment } from "./Attachment";
import { QuoteMessage } from "./QuoteMessage";
import { MessageFormatting } from "./MessageFormatting";
import { UserMention } from "./UserMention";
import { IReceivedMessageURLPreview } from "../types/IReceivedMessageURLPreview";
/**
 * A data (text) message sent on Signal
 * @internal
 */
export declare class DataMessage {
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
}
