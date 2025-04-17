"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigTrustLevel = void 0;
/**
 * The amount of trust the client should give to
 * contacts
 */
var ConfigTrustLevel;
(function (ConfigTrustLevel) {
    /**
     * Always trust new identities
     */
    ConfigTrustLevel["All"] = "always";
    /**
     * Trust new identities on first use
     * @default
     */
    ConfigTrustLevel["OnFirstUse"] = "on-first-use";
    /**
     * Never trust new identities
     */
    ConfigTrustLevel["None"] = "never";
})(ConfigTrustLevel || (exports.ConfigTrustLevel = ConfigTrustLevel = {}));
//# sourceMappingURL=ConfigTrustLevel.js.map