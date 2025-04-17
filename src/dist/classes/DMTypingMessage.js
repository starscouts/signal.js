"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMTypingMessage = void 0;
const DMMessage_1 = require("./DMMessage");
const DM_1 = require("./DM");
/**
 * A typing message sent in a {@link DM}
 */
class DMTypingMessage extends DMMessage_1.DMMessage {
    /**
     * @param user - The author of the message
     * @param action - The action associated with the typing message
     * @param time - The timestamp the message was sent at
     * @param client
     * @internal
     */
    constructor(user, action, time, client) {
        super(user, time, new DM_1.DM(user.uuid, user.number, client), client);
        this.action = action;
    }
}
exports.DMTypingMessage = DMTypingMessage;
//# sourceMappingURL=DMTypingMessage.js.map