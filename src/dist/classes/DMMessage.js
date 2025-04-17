"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMMessage = void 0;
const ReceivedMessage_1 = require("./ReceivedMessage");
/**
 * A message sent in a {@link DM}
 */
class DMMessage extends ReceivedMessage_1.ReceivedMessage {
    /**
     * @param user - The author of the message
     * @param time - The timestamp the message was sent at
     * @param dm - The DM the message was sent in
     * @param client
     * @param expirity - The number of seconds remaining before the message disappears, if applicable
     * @internal
     */
    constructor(user, time, dm, client, expirity) {
        super(user, time, dm, client, expirity);
        /**
         * Whether the message was sent in a group channel or not
         */
        this.isGroup = false;
    }
}
exports.DMMessage = DMMessage;
//# sourceMappingURL=DMMessage.js.map