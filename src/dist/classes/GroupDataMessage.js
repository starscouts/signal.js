"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupDataMessage = void 0;
const User_1 = require("./User");
const GroupMessage_1 = require("./GroupMessage");
const Group_1 = require("./Group");
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
 * A data (text) message sent in a {@link Group}
 */
class GroupDataMessage extends GroupMessage_1.GroupMessage {
    /**
     * @param user - The author of the message
     * @param data - Data associated with the message
     * @param time - The timestamp the message was sent at
     * @param groupId - The group the message was sent in
     * @param client
     * @internal
     */
    constructor(user, data, time, groupId, client) {
        super(user, time, new Group_1.Group(groupId, client), client, data.expiresInSeconds);
        /**
         * Attachments associated with the message
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
        this.client = client;
        this.content = data.message && data.message.trim().length > 0 ? data.message : null;
        if (data.quote)
            this.quote = new QuoteMessage_1.QuoteMessage(data.quote, client);
        this.attachments = data.attachments?.map(i => new Attachment_1.Attachment(i));
        this.formatting = new MessageFormatting_1.MessageFormatting(data.message && data.message.trim().length > 0 ? data.message : "", data.textStyles);
        this.mentions = data.mentions?.map(mention => new UserMention_1.UserMention(new User_1.User(mention, UserDataType_1.UserDataType.MentionOrGroup, client), mention.start, mention.length));
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
    /**
     * Delete the message
     */
    async delete() {
        let groupData = await CLIDispatcher_1.CLIDispatcher.dispatch("listGroups", {}, this.client.process);
        await CLIDispatcher_1.CLIDispatcher.dispatch("remoteDelete", {
            groupId: this.channel.id,
            recipient: groupData['result'].filter(i => i.id === this.channel.id)[0].members.map(i => i.number),
            targetTimestamp: this.createdTimestamp
        }, this.client.process);
    }
}
exports.GroupDataMessage = GroupDataMessage;
//# sourceMappingURL=GroupDataMessage.js.map