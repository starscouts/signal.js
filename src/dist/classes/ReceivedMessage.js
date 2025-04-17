"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceivedMessage = void 0;
/**
 * A message received from Signal
 * @internal
 */
class ReceivedMessage {
    /**
     * @param user - The author of the message
     * @param time - The timestamp the message was sent at
     * @param channel - The channel the message was sent it
     * @param client
     * @param expirity - The number of seconds remaining before the message disappears, if applicable
     * @internal
     */
    constructor(user, time, channel, client, expirity) {
        /**
         * Whether the message will disappear automatically or not (disappearing messages)
         */
        this.ephemeral = false;
        this.client = client;
        this.channel = channel;
        this.author = user;
        this.createdAt = new Date(time);
        this.createdTimestamp = time;
        if (expirity && expirity > 0) {
            this.ephemeral = true;
            this.expiresInSeconds = expirity;
            this.expiresTimestamp = new Date().getTime() + (expirity * 1000);
            this.expiresAt = new Date(new Date().getTime() + (expirity * 1000));
        }
        else if (expirity === null) {
            this.ephemeral = null;
        }
    }
}
exports.ReceivedMessage = ReceivedMessage;
//# sourceMappingURL=ReceivedMessage.js.map