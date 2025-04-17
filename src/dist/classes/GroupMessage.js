"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupMessage = void 0;
const ReceivedMessage_1 = require("./ReceivedMessage");
/**
 * A message sent in a {@link Group}
 */
class GroupMessage extends ReceivedMessage_1.ReceivedMessage {
    /**
     * @param user - The author of the message
     * @param time - The timestamp the message was sent at
     * @param group - The group the message was sent in
     * @param client
     * @param expirity - The number of seconds remaining before the message disappears, if applicable
     * @internal
     */
    constructor(user, time, group, client, expirity) {
        super(user, time, group, client, expirity);
        /**
         * Whether the message was sent in a group channel or not
         */
        this.isGroup = true;
    }
}
exports.GroupMessage = GroupMessage;
//# sourceMappingURL=GroupMessage.js.map