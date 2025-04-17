"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupReactionMessage = void 0;
const GroupMessage_1 = require("./GroupMessage");
const Group_1 = require("./Group");
const Emoji_1 = require("./Emoji");
const ReactionTarget_1 = require("./ReactionTarget");
/**
 * A reaction message sent in a {@link Group}
 */
class GroupReactionMessage extends GroupMessage_1.GroupMessage {
    /**
     * @param user - The author of the message
     * @param data - Data associated with the reaction
     * @param time - The timestamp the message was sent at
     * @param groupId - The group the message was sent in
     * @param client
     * @internal
     */
    constructor(user, data, time, groupId, client) {
        super(user, time, new Group_1.Group(groupId, client), client, data.expiresInSeconds);
        this.removed = data.reaction.isRemove;
        this.emoji = new Emoji_1.Emoji(data.reaction.emoji);
        this.target = new ReactionTarget_1.ReactionTarget(data, this.channel, client);
    }
}
exports.GroupReactionMessage = GroupReactionMessage;
//# sourceMappingURL=GroupReactionMessage.js.map