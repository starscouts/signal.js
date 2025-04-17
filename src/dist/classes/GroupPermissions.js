"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupPermissions = void 0;
const GroupPermissionLevel_1 = require("../enums/GroupPermissionLevel");
const GroupPermissionName_1 = require("../enums/GroupPermissionName");
const CLIDispatcher_1 = require("./CLIDispatcher");
/**
 * Permissions associated with a group
 */
class GroupPermissions {
    /**
     * @param groupData - The data associated with this group
     * @param editor - The originating GroupEditor
     * @param client
     * @internal
     */
    constructor(groupData, editor, client) {
        this.editor = editor;
        if (groupData.permissionAddMember === "ONLY_ADMINS") {
            this.addMember = GroupPermissionLevel_1.GroupPermissionLevel.Admins;
        }
        else {
            this.addMember = GroupPermissionLevel_1.GroupPermissionLevel.Everyone;
        }
        if (groupData.permissionEditDetails === "ONLY_ADMINS") {
            this.editDetails = GroupPermissionLevel_1.GroupPermissionLevel.Admins;
        }
        else {
            this.editDetails = GroupPermissionLevel_1.GroupPermissionLevel.Everyone;
        }
        if (groupData.permissionSendMessage === "ONLY_ADMINS") {
            this.sendMessage = GroupPermissionLevel_1.GroupPermissionLevel.Admins;
        }
        else {
            this.sendMessage = GroupPermissionLevel_1.GroupPermissionLevel.Everyone;
        }
    }
    /**
     * Change a permission's level
     * @param permission - The permission name
     * @param level - The permission level
     */
    async change(permission, level) {
        if (permission === GroupPermissionName_1.GroupPermissionName.AddMember) {
            await CLIDispatcher_1.CLIDispatcher.dispatch("updateGroup", {
                group: this.editor.id, setPermissionAddMember: level === "ONLY_ADMINS" ? "only-admins" : "every-member"
            }, this.client.process);
        }
        else if (permission === GroupPermissionName_1.GroupPermissionName.EditDetails) {
            await CLIDispatcher_1.CLIDispatcher.dispatch("updateGroup", {
                group: this.editor.id,
                setPermissionEditDetails: level === "ONLY_ADMINS" ? "only-admins" : "every-member"
            }, this.client.process);
        }
        else if (permission === GroupPermissionName_1.GroupPermissionName.SendMessage) {
            await CLIDispatcher_1.CLIDispatcher.dispatch("updateGroup", {
                group: this.editor.id,
                setPermissionSendMessages: level === "ONLY_ADMINS" ? "only-admins" : "every-member"
            }, this.client.process);
        }
    }
}
exports.GroupPermissions = GroupPermissions;
//# sourceMappingURL=GroupPermissions.js.map