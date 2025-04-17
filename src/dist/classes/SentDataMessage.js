"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentDataMessage = void 0;
const Group_1 = require("./Group");
const SentMessage_1 = require("./SentMessage");
const CLIDispatcher_1 = require("./CLIDispatcher");
/**
 * A text message sent to Signal
 */
class SentDataMessage extends SentMessage_1.SentMessage {
    /**
     * @param time - The timestamp at which the message was sent
     * @param channel - The channel the message was sent in
     * @param client
     * @param content - The text of the message
     * @param options - The options used to build the message
     * @internal
     */
    constructor(time, channel, client, content, options) {
        super(time, channel, client);
        this.content = content;
        this.options = options;
    }
    /**
     * Edit the message
     * @param text - The new text of the message
     * @param options - The new options used to build the message
     */
    async edit(text, options) {
        if (options) {
            options.original = this.createdTimestamp;
        }
        else {
            options = {
                original: this.createdTimestamp
            };
        }
        return await this.channel.send(text, options);
    }
    /**
     * Delete the message
     */
    async delete() {
        if (this.channel instanceof Group_1.Group) {
            let groupData = await CLIDispatcher_1.CLIDispatcher.dispatch("listGroups", {}, this.client.process);
            await CLIDispatcher_1.CLIDispatcher.dispatch("remoteDelete", {
                groupId: this.channel.id,
                recipient: groupData['result'].filter(i => i.id === this.channel.id)[0].members.map(i => i.number),
                targetTimestamp: this.createdTimestamp
            }, this.client.process);
        }
        else {
            await CLIDispatcher_1.CLIDispatcher.dispatch("remoteDelete", {
                recipient: [this.channel.number], targetTimestamp: this.createdTimestamp
            }, this.client.process);
        }
    }
}
exports.SentDataMessage = SentDataMessage;
//# sourceMappingURL=SentDataMessage.js.map