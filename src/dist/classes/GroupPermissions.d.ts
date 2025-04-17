import { GroupPermissionLevel } from "../enums/GroupPermissionLevel";
import { Client } from "./Client";
import { GroupPermissionName } from "../enums/GroupPermissionName";
import { GroupEditor } from "./GroupEditor";
/**
 * Permissions associated with a group
 */
export declare class GroupPermissions {
    /**
     * Current permission level for the "Who can add members" permission
     */
    addMember: GroupPermissionLevel;
    /**
     * Current permission level for the "Who can edit group info" permission
     */
    editDetails: GroupPermissionLevel;
    /**
     * Current permission level for the "Who can send messages" permission
     */
    sendMessage: GroupPermissionLevel;
    /**
     * Originating {@link GroupEditor}
     */
    editor: GroupEditor;
    private client;
    /**
     * @param groupData - The data associated with this group
     * @param editor - The originating GroupEditor
     * @param client
     * @internal
     */
    constructor(groupData: any, editor: GroupEditor, client: Client);
    /**
     * Change a permission's level
     * @param permission - The permission name
     * @param level - The permission level
     */
    change(permission: GroupPermissionName, level: GroupPermissionLevel): Promise<void>;
}
