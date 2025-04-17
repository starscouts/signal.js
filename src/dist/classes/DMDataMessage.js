"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMDataMessage = void 0;
const User_1 = require("./User");
const DMMessage_1 = require("./DMMessage");
const DM_1 = require("./DM");
const Attachment_1 = require("./Attachment");
const QuoteMessage_1 = require("./QuoteMessage");
const CLIDispatcher_1 = require("./CLIDispatcher");
const MessageReceipt_1 = require("../enums/MessageReceipt");
const MessageFormatting_1 = require("./MessageFormatting");
const UserMention_1 = require("./UserMention");
const UserDataType_1 = require("../enums/UserDataType");
const ReceivedURLPreview_1 = require("./ReceivedURLPreview");
const QuoteBuilder_1 = require("./QuoteBuilder");
/**
 * A data (text) message sent in a {@link DM}
 */
class DMDataMessage extends DMMessage_1.DMMessage {
    /**
     * @param user - The author of the message
     * @param data - Data associated with the message
     * @param time - The timestamp the message was sent at
     * @param client
     * @internal
     */
    constructor(user, data, time, client) {
        super(user, time, new DM_1.DM(user.uuid, user.number, client), client, data.expiresInSeconds);
        /**
         * {@link Attachment}s associated with the message
         */
        this.attachments = [];
        /**
         * Mentions in the message
         */
        this.mentions = [];
        /**
         * URL previews present in the message
         */
        this.previews = [];
        this.content = data.message && data.message.trim().length > 0 ? data.message : null;
        if (data.quote)
            this.quote = new QuoteMessage_1.QuoteMessage(data.quote, client);
        this.attachments = data.attachments?.map(i => new Attachment_1.Attachment(i));
        this.formatting = new MessageFormatting_1.MessageFormatting(data.message && data.message.trim().length > 0 ? data.message : "", data.textStyles);
        this.mentions = data.mentions?.map(mention => new UserMention_1.UserMention(new User_1.User(UserDataType_1.UserDataType.MentionOrGroup, mention, client), mention.start, mention.length));
        this.previews = data.previews?.map(preview => (new ReceivedURLPreview_1.ReceivedURLPreview(preview)).build());
    }
    /**
     * Mark the message as read
     */
    async markAsRead() {
        await CLIDispatcher_1.CLIDispatcher.dispatch("sendReceipt", {
            recipient: this.author.number, targetTimestamp: this.createdTimestamp, type: MessageReceipt_1.MessageReceipt.Read
        }, this.client.process);
    }
    /**
     * Mark the message as viewed
     */
    async markAsViewed() {
        await CLIDispatcher_1.CLIDispatcher.dispatch("sendReceipt", {
            recipient: this.author.number, targetTimestamp: this.createdTimestamp, type: MessageReceipt_1.MessageReceipt.Viewed
        }, this.client.process);
    }
    /**
     * Reply to (quote) the message
     * @param text - The text of the reply
     * @param options - The options used to build the reply message
     */
    async reply(text, options) {
        if (options) {
            options.quote = new QuoteBuilder_1.QuoteBuilder(this.client, this.createdTimestamp, this.author.number, this.content);
        }
        else {
            options = {
                quote: new QuoteBuilder_1.QuoteBuilder(this.client, this.createdTimestamp, this.author.number, this.content)
            };
        }
        return await this.channel.send(text, options);
    }
}
exports.DMDataMessage = DMDataMessage;
//# sourceMappingURL=DMDataMessage.js.map