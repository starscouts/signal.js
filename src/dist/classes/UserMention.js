"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMention = void 0;
const User_1 = require("./User");
/**
 * A mention of a user in a message
 */
class UserMention {
    /**
     * @param user - The {@link User} (or {@link IUserResolvable}) to mention
     * @param start - Where the mention should start in the message
     * @param length - How long the mention should be in the message
     * @internal
     */
    constructor(user, start, length) {
        /**
         * The length of the mention in the message
         */
        this.length = 1;
        this.number = user instanceof User_1.User ? user.number : user;
        this.start = start ?? 0;
        this.length = length ?? 1;
    }
    /**
     * Convert the mention to a format that can be passed to signal-cli
     */
    toCLIFormat() {
        return this.start + ":" + this.length + ":" + this.number;
    }
}
exports.UserMention = UserMention;
//# sourceMappingURL=UserMention.js.map