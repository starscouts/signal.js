"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupEditMessage = void 0;
const GroupDataMessage_1 = require("./GroupDataMessage");
/**
 * An edit message sent in a {@link Group}
 */
class GroupEditMessage extends GroupDataMessage_1.GroupDataMessage {
    /**
     * @param user - The author of the message
     * @param data - Data associated with the message
     * @param time - The timestamp the message was sent at
     * @param groupId - The group the message was sent in
     * @param originalTime - The timestamp the original message was sent at
     * @param client
     * @internal
     */
    constructor(user, data, time, groupId, originalTime, client) {
        super(user, data, time, groupId, client);
        this.originalCreatedAt = new Date(originalTime);
        this.originalCreatedTimestamp = originalTime;
    }
}
exports.GroupEditMessage = GroupEditMessage;
//# sourceMappingURL=GroupEditMessage.js.map