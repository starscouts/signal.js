import {Channel} from "./Channel";
import {CLIDispatcher} from "./CLIDispatcher";
import {Client} from "./Client";
import {IChatMessageOptions} from "../types/IChatMessageOptions";
import {SentDataMessage} from "./SentDataMessage";
import {Sticker} from "./Sticker";
import {MessageFormatting} from "./MessageFormatting";

/**
 * A Signal 1-to-1 chat
 */
export class DM extends Channel {
    /**
     * Whether the channel is a group chat
     */
    public group: boolean = false;

    /**
     * Recipient's phone number
     */
    public number: string;
    private client: Client;

    /**
     * @param userId - The ID of the user
     * @param number - The user's phone number
     * @param client
     * @internal
     */
    constructor(userId: string | null, number: string, client: Client) {
        super();
        this.id = userId;
        this.number = number;
        this.client = client;
    }

    /**
     * Send a message to the channel
     * @param text - The text of the message, or an empty string
     * @param options - The optional options used to build the message
     */
    public async send(text: string, options?: IChatMessageOptions): Promise<SentDataMessage> {
        let originalText = text;

        if (options?.markdown) {
            text = MessageFormatting.plainFromMarkdown(text);
            options.formatting = MessageFormatting.fromMarkdown(originalText);
        }

        let data = await CLIDispatcher.dispatch("send", {
            recipient: [this.number],
            message: text,
            attachment: options?.attachments?.map(i => i.uri) ?? [],
            quoteTimestamp: options?.quote?.build().createdTimestamp,
            quoteAuthor: options?.quote?.build().author.number,
            quoteMessage: options?.quote?.build().content,
            editTimestamp: options?.original,
            previewUrl: options?.preview?.url,
            previewTitle: options?.preview?.title,
            previewDescription: options?.preview?.description,
            previewImage: options?.preview?.image,
            textStyle: options?.formatting?.rules.map(rule => rule.toCLIFormat()),
            mention: options?.mentions?.map(rule => rule.toCLIFormat())
        }, this.client.process);

        let timestamp = data.result?.timestamp;
        return new SentDataMessage(timestamp, this, this.client, text, options);
    }

    /**
     * Set the client's typing status for this channel
     * @param typing - Whether the client should be typing or not
     */
    public async setTyping(typing: boolean): Promise<void> {
        await CLIDispatcher.dispatch("sendTyping", {
            recipient: [this.number], stop: !typing
        }, this.client.process);
    }

    /**
     * Send a sticker to this channel
     * @param sticker - The sticker to send
     */
    public async sendSticker(sticker: Sticker): Promise<void> {
        await CLIDispatcher.dispatch("send", {
            recipient: [this.number], sticker: sticker.pack.id + ":" + sticker.id
        }, this.client.process);
    }
}