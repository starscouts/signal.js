"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
/**
 * A channel (either DM or group) on Signal
 */
class Channel {
    /**
     * @internal
     */
    constructor() {
    }
    /**
     * Send a message to the channel
     * @param text - The text of the message, or an empty string
     * @param options - The optional options used to build the message
     */
    // @ts-ignore
    async send(text, options) {
    }
    /**
     * Set the client's typing status for this channel
     * @param typing - Whether the client should be typing or not
     */
    async setTyping(typing) {
    }
}
exports.Channel = Channel;
//# sourceMappingURL=Channel.js.map