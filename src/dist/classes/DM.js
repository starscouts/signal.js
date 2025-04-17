"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DM = void 0;
const Channel_1 = require("./Channel");
const CLIDispatcher_1 = require("./CLIDispatcher");
const SentDataMessage_1 = require("./SentDataMessage");
const MessageFormatting_1 = require("./MessageFormatting");
/**
 * A Signal 1-to-1 chat
 */
class DM extends Channel_1.Channel {
    /**
     * @param userId - The ID of the user
     * @param number - The user's phone number
     * @param client
     * @internal
     */
    constructor(userId, number, client) {
        super();
        /**
         * Whether the channel is a group chat
         */
        this.group = false;
        this.id = userId;
        this.number = number;
        this.client = client;
    }
    /**
     * Send a message to the channel
     * @param text - The text of the message, or an empty string
     * @param options - The optional options used to build the message
     */
    async send(text, options) {
        let originalText = text;
        if (options?.markdown) {
            text = MessageFormatting_1.MessageFormatting.plainFromMarkdown(text);
            options.formatting = MessageFormatting_1.MessageFormatting.fromMarkdown(originalText);
        }
        let data = await CLIDispatcher_1.CLIDispatcher.dispatch("send", {
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
        return new SentDataMessage_1.SentDataMessage(timestamp, this, this.client, text, options);
    }
    /**
     * Set the client's typing status for this channel
     * @param typing - Whether the client should be typing or not
     */
    async setTyping(typing) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("sendTyping", {
            recipient: [this.number], stop: !typing
        }, this.client.process);
    }
    /**
     * Send a sticker to this channel
     * @param sticker - The sticker to send
     */
    async sendSticker(sticker) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("send", {
            recipient: [this.number], sticker: sticker.pack.id + ":" + sticker.id
        }, this.client.process);
    }
}
exports.DM = DM;
//# sourceMappingURL=DM.js.map