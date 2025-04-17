"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMReactionMessage = void 0;
const DMMessage_1 = require("./DMMessage");
const DM_1 = require("./DM");
const Emoji_1 = require("./Emoji");
const ReactionTarget_1 = require("./ReactionTarget");
/**
 * A reaction message sent in a {@link DM}
 */
class DMReactionMessage extends DMMessage_1.DMMessage {
    /**
     * @param user - The author of the message
     * @param data - Data associated with the reaction
     * @param time - The timestamp the message was sent at
     * @param client
     * @internal
     */
    constructor(user, data, time, client) {
        super(user, time, new DM_1.DM(user.uuid, user.number, client), client, data.expiresInSeconds);
        this.removed = data.reaction.isRemove;
        this.emoji = new Emoji_1.Emoji(data.reaction.emoji);
        this.target = new ReactionTarget_1.ReactionTarget(data, this.channel, client);
    }
}
exports.DMReactionMessage = DMReactionMessage;
//# sourceMappingURL=DMReactionMessage.js.map