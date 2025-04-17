import {User} from "./User";
import {GroupMessage} from "./GroupMessage";
import {Group} from "./Group";
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
 * A data (text) message sent in a {@link Group}
 */
export class GroupDataMessage extends GroupMessage implements DataMessage {
    /**
     * Message text
     */
    public content?: string;

    /**
     * Attachments associated with the message
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
     * @param groupId - The group the message was sent in
     * @param client
     * @internal
     */
    constructor(user: User, data: any, time: number, groupId: string, client) {
        super(user, time, new Group(groupId, client), client, data.expiresInSeconds);
        this.client = client;
        this.content = data.message && data.message.trim().length > 0 ? data.message : null;
        if (data.quote) this.quote = new QuoteMessage(data.quote, client);
        this.attachments = data.attachments?.map(i => new Attachment(i));
        this.formatting = new MessageFormatting(data.message && data.message.trim().length > 0 ? data.message : "", data.textStyles);
        this.mentions = data.mentions?.map(mention => new UserMention(new User(mention, UserDataType.MentionOrGroup, client), mention.start, mention.length));
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

    /**
     * Delete the message
     */
    public async delete(): Promise<void> {
        let groupData = await CLIDispatcher.dispatch("listGroups", {}, this.client.process);

        await CLIDispatcher.dispatch("remoteDelete", {
            groupId: this.channel.id,
            recipient: groupData['result'].filter(i => i.id === this.channel.id)[0].members.map(i => i.number),
            targetTimestamp: this.createdTimestamp
        }, this.client.process);
    }
}