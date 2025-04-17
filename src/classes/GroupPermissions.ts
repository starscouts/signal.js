import {GroupPermissionLevel} from "../enums/GroupPermissionLevel";
import {Client} from "./Client";
import {GroupPermissionName} from "../enums/GroupPermissionName";
import {CLIDispatcher} from "./CLIDispatcher";
import {GroupEditor} from "./GroupEditor";

/**
 * Permissions associated with a group
 */
export class GroupPermissions {
    /**
     * Current permission level for the "Who can add members" permission
     */
    public addMember: GroupPermissionLevel;

    /**
     * Current permission level for the "Who can edit group info" permission
     */
    public editDetails: GroupPermissionLevel;

    /**
     * Current permission level for the "Who can send messages" permission
     */
    public sendMessage: GroupPermissionLevel;

    /**
     * Originating {@link GroupEditor}
     */
    public editor: GroupEditor;
    private client: Client;

    /**
     * @param groupData - The data associated with this group
     * @param editor - The originating GroupEditor
     * @param client
     * @internal
     */
    constructor(groupData: any, editor: GroupEditor, client: Client) {
        this.editor = editor;

        if (groupData.permissionAddMember === "ONLY_ADMINS") {
            this.addMember = GroupPermissionLevel.Admins;
        } else {
            this.addMember = GroupPermissionLevel.Everyone;
        }

        if (groupData.permissionEditDetails === "ONLY_ADMINS") {
            this.editDetails = GroupPermissionLevel.Admins;
        } else {
            this.editDetails = GroupPermissionLevel.Everyone;
        }

        if (groupData.permissionSendMessage === "ONLY_ADMINS") {
            this.sendMessage = GroupPermissionLevel.Admins;
        } else {
            this.sendMessage = GroupPermissionLevel.Everyone;
        }
    }

    /**
     * Change a permission's level
     * @param permission - The permission name
     * @param level - The permission level
     */
    public async change(permission: GroupPermissionName, level: GroupPermissionLevel) {
        if (permission === GroupPermissionName.AddMember) {
            await CLIDispatcher.dispatch("updateGroup", {
                group: this.editor.id, setPermissionAddMember: level === "ONLY_ADMINS" ? "only-admins" : "every-member"
            }, this.client.process);
        } else if (permission === GroupPermissionName.EditDetails) {
            await CLIDispatcher.dispatch("updateGroup", {
                group: this.editor.id,
                setPermissionEditDetails: level === "ONLY_ADMINS" ? "only-admins" : "every-member"
            }, this.client.process);
        } else if (permission === GroupPermissionName.SendMessage) {
            await CLIDispatcher.dispatch("updateGroup", {
                group: this.editor.id,
                setPermissionSendMessages: level === "ONLY_ADMINS" ? "only-admins" : "every-member"
            }, this.client.process);
        }
    }
}