import {Attachment} from "./Attachment";
import {QuoteMessage} from "./QuoteMessage";
import {MessageFormatting} from "./MessageFormatting";
import {UserMention} from "./UserMention";
import {IReceivedMessageURLPreview} from "../types/IReceivedMessageURLPreview";

/**
 * A data (text) message sent on Signal
 * @internal
 */
export class DataMessage {
    /**
     * Message text
     */
    public content?: string;

    /**
     * {@link Attachment}s associated with the message
     */
    public attachments: Attachment[] = [];

    /**
     * Mentions in the message
     */
    public mentions: UserMention[] = [];

    /**
     * URL previews present in the message
     */
    public previews: IReceivedMessageURLPreview[] = [];

    /**
     * Formatting rules collection for this message
     */
    public formatting: MessageFormatting;

    /**
     * Quoted message, if applicable
     */
    public quote?: QuoteMessage;
}