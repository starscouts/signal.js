"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMDeleteMessage = void 0;
const DMMessage_1 = require("./DMMessage");
const DM_1 = require("./DM");
/**
 * A deletion message sent in a {@link DM}
 */
class DMDeleteMessage extends DMMessage_1.DMMessage {
    /**
     * @param user - The author of the message
     * @param data - Data associated with the message
     * @param time - The timestamp the message was sent at
     * @param originalTime - The timestamp the original message was sent at
     * @param client
     * @internal
     */
    constructor(user, data, time, client, originalTime) {
        super(user, time, new DM_1.DM(user.uuid, user.number, client), client, data.expiresInSeconds);
        this.originalCreatedAt = new Date(originalTime);
        this.originalCreatedTimestamp = originalTime;
    }
}
exports.DMDeleteMessage = DMDeleteMessage;
//# sourceMappingURL=DMDeleteMessage.js.map