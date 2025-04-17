"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupDeleteMessage = void 0;
const GroupMessage_1 = require("./GroupMessage");
const Group_1 = require("./Group");
/**
 * A deletion message sent in a {@link Group}
 */
class GroupDeleteMessage extends GroupMessage_1.GroupMessage {
    /**
     * @param user - The author of the message
     * @param data - Data associated with the message
     * @param time - The timestamp the message was sent at
     * @param groupId - The group the message was sent in
     * @param originalTime - The timestamp the original message was sent at
     * @param client
     * @internal
     */
    constructor(user, data, time, groupId, client, originalTime) {
        super(user, time, new Group_1.Group(groupId, client), client, data.expiresInSeconds);
        this.originalCreatedAt = new Date(originalTime);
        this.originalCreatedTimestamp = originalTime;
    }
}
exports.GroupDeleteMessage = GroupDeleteMessage;
//# sourceMappingURL=GroupDeleteMessage.js.map