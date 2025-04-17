import {AttachmentBuilder} from "../classes/AttachmentBuilder";
import {QuoteBuilder} from "../classes/QuoteBuilder";
import {MessageFormatting} from "../classes/MessageFormatting";
import {UserMention} from "../classes/UserMention";
import {ISentMessageURLPreview} from "./ISentMessageURLPreview";

/**
 * Options to be used when sending a message
 * to a channel
 */
export interface IChatMessageOptions {
    /**
     * All the attachments to be sent with the message,
     * unless they are too large
     */
    attachments?: AttachmentBuilder[];

    /**
     * A quote to add to the message, which should
     * reference an older message (see QuoteBuilder)
     */
    quote?: QuoteBuilder;

    /**
     * The timestamp of an older message, used only
     * internally and only if the new message is an
     * edit
     */
    original?: number;

    /**
     * A URL preview to add to the message
     */
    preview?: ISentMessageURLPreview;

    /**
     * Formatting options to add to the message
     */
    formatting?: MessageFormatting;

    /**
     * One or more users to mention with this
     * message
     *
     * Note that the text that was where the
     * mention(s) is/are will be discarded.
     */
    mentions?: UserMention[];

    /**
     * Whether the text of the message should be treated
     * as Markdown or not.
     *
     * When this is enabled, the text will go through a
     * Markdown parser and the contents of `formatting`
     * will be replaced by the result of the Markdown
     * parser.
     */
    markdown?: boolean;
}