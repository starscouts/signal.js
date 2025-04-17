"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionTarget = void 0;
const User_1 = require("./User");
const UserDataType_1 = require("../enums/UserDataType");
const ReceivedMessage_1 = require("./ReceivedMessage");
/**
 * The target message for a reaction
 */
class ReactionTarget extends ReceivedMessage_1.ReceivedMessage {
    /**
     * @param data - The data to reconstruct the target message
     * @param channel - The channel the target message is in
     * @param client
     * @internal
     */
    constructor(data, channel, client) {
        super(new User_1.User(data.reaction, UserDataType_1.UserDataType.Reaction, client), data.reaction.targetSentTimestamp, channel, client, null);
    }
}
exports.ReactionTarget = ReactionTarget;
//# sourceMappingURL=ReactionTarget.js.map