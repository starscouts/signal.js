import {User} from "./User";
import {DMMessage} from "./DMMessage";
import {DM} from "./DM";
import {Client} from "./Client";
import {DataMessage} from "./DataMessage";
import {Attachment} from "./Attachment";
import {QuoteMessage} from "./QuoteMessage";
import {CLIDispatcher} from "./CLIDispatcher";
import {MessageReceipt} from "../enums/MessageReceipt";
import {MessageFormatting} from "./MessageFormatting";
import {UserMention} from "./UserMention";
import {UserDataType} from "../enums/UserDataType";
import {ReceivedURLPreview} from "./ReceivedURLPreview";
import {IReceivedMessageURLPreview} from "../types/IReceivedMessageURLPreview";
import {IChatMessageOptions} from "../types/IChatMessageOptions";
import {SentDataMessage} from "./SentDataMessage";
import {QuoteBuilder} from "./QuoteBuilder";

/**
 * A data (text) message sent in a {@link DM}
 */
export class DMDataMessage extends DMMessage implements DataMessage {
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

    /**
     * @param user - The author of the message
     * @param data - Data associated with the message
     * @param time - The timestamp the message was sent at
     * @param client
     * @internal
     */
    constructor(user: User, data: any, time: number, client: Client) {
        super(user, time, new DM(user.uuid, user.number, client), client, data.expiresInSeconds);
        this.content = data.message && data.message.trim().length > 0 ? data.message : null;
        if (data.quote) this.quote = new QuoteMessage(data.quote, client);
        this.attachments = data.attachments?.map(i => new Attachment(i));
        this.formatting = new MessageFormatting(data.message && data.message.trim().length > 0 ? data.message : "", data.textStyles);
        this.mentions = data.mentions?.map(mention => new UserMention(new User(UserDataType.MentionOrGroup, mention, client), mention.start, mention.length));
        this.previews = data.previews?.map(preview => (new ReceivedURLPreview(preview)).build());
    }

    /**
     * Mark the message as read
     */
    public async markAsRead() {
        await CLIDispatcher.dispatch("sendReceipt", {
            recipient: this.author.number, targetTimestamp: this.createdTimestamp, type: MessageReceipt.Read
        }, this.client.process)
    }

    /**
     * Mark the message as viewed
     */
    public async markAsViewed() {
        await CLIDispatcher.dispatch("sendReceipt", {
            recipient: this.author.number, targetTimestamp: this.createdTimestamp, type: MessageReceipt.Viewed
        }, this.client.process)
    }

    /**
     * Reply to (quote) the message
     * @param text - The text of the reply
     * @param options - The options used to build the reply message
     */
    public async reply(text: string, options?: IChatMessageOptions): Promise<SentDataMessage> {
        if (options) {
            options.quote = new QuoteBuilder(this.client, this.createdTimestamp, this.author.number, this.content);
        } else {
            options = {
                quote: new QuoteBuilder(this.client, this.createdTimestamp, this.author.number, this.content)
            }
        }

        return await this.channel.send(text, options);
    }
}
