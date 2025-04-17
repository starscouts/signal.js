"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupLinkStatus = void 0;
/**
 * The state of a group's invite link
 */
var GroupLinkStatus;
(function (GroupLinkStatus) {
    /**
     * On
     */
    GroupLinkStatus["Enabled"] = "enabled";
    /**
     * On, approve new members
     */
    GroupLinkStatus["WithApproval"] = "withApproval";
    /**
     * Off
     * @default
     */
    GroupLinkStatus["Disabled"] = "disabled";
})(GroupLinkStatus || (exports.GroupLinkStatus = GroupLinkStatus = {}));
//# sourceMappingURL=GroupLinkStatus.js.map