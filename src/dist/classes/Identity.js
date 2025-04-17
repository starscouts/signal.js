"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identity = void 0;
const User_1 = require("./User");
const UserDataType_1 = require("../enums/UserDataType");
class Identity {
    /**
     * @internal
     * @param data - The data used to construct the identity
     * @param client
     */
    constructor(data, client) {
        this.user = new User_1.User(data, UserDataType_1.UserDataType.ProfileOrIdentity, client);
        this.fingerprint = data.fingerprint;
        this.safetyNumber = data.safetyNumber;
        this.safetyNumberScannable = data.scannableSafetyNumber;
        this.trusted = data.trustLevel === "TRUSTED_VERIFIED";
        this.addedAt = new Date(data.addedTimestamp);
    }
}
exports.Identity = Identity;
//# sourceMappingURL=Identity.js.map