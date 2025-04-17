"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataType = void 0;
/**
 * The type of data used to construct a {@link User}
 */
var UserDataType;
(function (UserDataType) {
    /**
     * From an encrypted message
     */
    UserDataType[UserDataType["Envelope"] = 0] = "Envelope";
    /**
     * From a quote inside a message
     */
    UserDataType[UserDataType["Quote"] = 1] = "Quote";
    /**
     * From a reaction message
     */
    UserDataType[UserDataType["Reaction"] = 2] = "Reaction";
    /**
     * From a mention or a group user
     */
    UserDataType[UserDataType["MentionOrGroup"] = 3] = "MentionOrGroup";
    /**
     * From an arbitrary phone number
     */
    UserDataType[UserDataType["Number"] = 4] = "Number";
    /**
     * From a user's profile or identity
     */
    UserDataType[UserDataType["ProfileOrIdentity"] = 5] = "ProfileOrIdentity";
})(UserDataType || (exports.UserDataType = UserDataType = {}));
//# sourceMappingURL=UserDataType.js.map