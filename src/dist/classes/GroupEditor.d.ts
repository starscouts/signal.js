import { Group } from "./Group";
import { User } from "./User";
import { GroupPermissions } from "./GroupPermissions";
import { Client } from "./Client";
import { AttachmentBuilder } from "./AttachmentBuilder";
import { GroupLinkStatus } from "../enums/GroupLinkStatus";
/**
 * A collector and editor of information related to the group
 */
export declare class GroupEditor {
    /**
     * {@link Group} being worked on
     */
    initiator: Group;
    /**
     * ID of the group
     */
    id: string;
    /**
     * Name of the group
     */
    name: string;
    /**
     * Optional description for the group
     */
    description?: string;
    /**
     * Whether this client is a member of the group or not
     */
    isMember: boolean;
    /**
     * Whether this client has blocked the group or not
     */
    isBlocked: boolean;
    /**
     * If disappearing messages are enabled, amount of seconds before a message disappears
     */
    expirationSeconds: number;
    /**
     * List of members in the group
     */
    members: User[];
    /**
     * List of members pending acceptance
     */
    pendingMembers: User[];
    /**
     * List of members pending admin approval
     */
    requestingMembers: User[];
    /**
     * List of admins
     */
    admins: User[];
    /**
     * List of members banned from the group
     */
    bannedMembers: User[];
    /**
     * Permission information
     */
    permissions: GroupPermissions;
    /**
     * If enabled, link to the group
     */
    inviteLink?: string;
    private client;
    /**
     * @param initiator - The group being worked on
     * @param data - Data from signal-cli
     * @param client
     * @internal
     */
    constructor(initiator: Group, data: any, client: Client);
    /**
     * Update the name of the group
     * @param name - The new group name
     */
    setName(name: string): Promise<void>;
    /**
     * Update the description of the group
     * @param description - The new group description
     */
    setDescription(description: string): Promise<void>;
    /**
     * Update the avatar of the group
     * @param avatar - The new group avatar
     */
    setAvatar(avatar: AttachmentBuilder): Promise<void>;
    /**
     * Update the disappearing messages setting for the group
     * @param seconds - The time (in seconds) before a message gets deleted.
     * Use 0 to disable disappearing messages
     */
    setExpirationSeconds(seconds: number): Promise<void>;
    /**
     * Reset the group invite link and create a new one
     */
    resetInviteLink(): Promise<void>;
    /**
     * Change the status of the group invite link
     * @param status - The new group invite link status
     */
    setLinkStatus(status: GroupLinkStatus): Promise<void>;
}
