"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentMessage = void 0;
/**
 * A message sent to Signal by this client
 */
class SentMessage {
    /**
     * @param time - The timestamp at which the sticker was sent
     * @param channel - The channel the sticker was sent at
     * @param client
     * @internal
     */
    constructor(time, channel, client) {
        this.client = client;
        this.channel = channel;
        this.createdAt = new Date(time);
        this.createdTimestamp = time;
    }
}
exports.SentMessage = SentMessage;
//# sourceMappingURL=SentMessage.js.map