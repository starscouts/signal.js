"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentStickerMessage = void 0;
const Group_1 = require("./Group");
const SentMessage_1 = require("./SentMessage");
const CLIDispatcher_1 = require("./CLIDispatcher");
/**
 * A sticker as sent to Signal
 */
class SentStickerMessage extends SentMessage_1.SentMessage {
    /**
     * @param time - The timestamp at which the sticker was sent
     * @param channel - The channel the sticker was sent at
     * @param client
     * @param sticker - The sticker that was sent
     * @internal
     */
    constructor(time, channel, client, sticker) {
        super(time, channel, client);
        this.sticker = sticker;
    }
    /**
     * Delete the sticker message
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
exports.SentStickerMessage = SentStickerMessage;
//# sourceMappingURL=SentStickerMessage.js.map