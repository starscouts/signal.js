"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfile = void 0;
const User_1 = require("./User");
const UserDataType_1 = require("../enums/UserDataType");
const Emoji_1 = require("./Emoji");
/**
 * A user profile with additional data
 */
class UserProfile {
    /**
     * @internal
     * @param data - The data to reconstruct the profile
     * @param client
     */
    constructor(data, client) {
        this.user = new User_1.User(data, UserDataType_1.UserDataType.ProfileOrIdentity, client);
        this.userName = data.username;
        this.blocked = data.isBlocked;
        this.lastUpdatedAt = new Date(data.profile.lastUpdateTimestamp);
        this.firstName = data.givenName && data.givenName.trim() !== "" ? data.givenName : null;
        this.lastName = data.lastName && data.lastName.trim() !== "" ? data.lastName : null;
        this.status = {
            text: data.profile.about && data.profile.about.trim() !== "" ? data.profile.about : null,
            emoji: data.profile.aboutEmoji && data.profile.aboutEmoji.trim() !== "" ? new Emoji_1.Emoji(data.profile.aboutEmoji) : null
        };
        this.mobileCoinAddress = data.mobileCoinAddress;
    }
}
exports.UserProfile = UserProfile;
//# sourceMappingURL=UserProfile.js.map