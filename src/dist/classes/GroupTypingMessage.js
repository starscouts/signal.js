"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupTypingMessage = void 0;
const GroupMessage_1 = require("./GroupMessage");
const Group_1 = require("./Group");
/**
 * A {@link TypingMessage} sent in a {@link Group}
 */
class GroupTypingMessage extends GroupMessage_1.GroupMessage {
    /**
     * @param user - The author of the message
     * @param action - The action associated with the typing message
     * @param time - The timestamp the message was sent at
     * @param groupId - The group the message was sent in
     * @param client
     * @internal
     */
    constructor(user, action, time, groupId, client) {
        super(user, time, new Group_1.Group(groupId, client), client);
        this.action = action;
    }
}
exports.GroupTypingMessage = GroupTypingMessage;
//# sourceMappingURL=GroupTypingMessage.js.map