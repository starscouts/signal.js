"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMEditMessage = void 0;
const DMDataMessage_1 = require("./DMDataMessage");
/**
 * An edit message sent in a {@link DM}
 */
class DMEditMessage extends DMDataMessage_1.DMDataMessage {
    /**
     * @param user - The author of the message
     * @param data - Data associated with the message
     * @param time - The timestamp the message was sent at
     * @param originalTime - The timestamp the original message was sent at
     * @param client
     * @internal
     */
    constructor(user, data, time, originalTime, client) {
        super(user, data, time, client);
        this.originalCreatedAt = new Date(originalTime);
        this.originalCreatedTimestamp = originalTime;
    }
}
exports.DMEditMessage = DMEditMessage;
//# sourceMappingURL=DMEditMessage.js.map