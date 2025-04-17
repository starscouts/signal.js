import {Group} from "./Group";
import {User} from "./User";
import {GroupPermissions} from "./GroupPermissions";
import {UserDataType} from "../enums/UserDataType";
import {Client} from "./Client";
import {CLIDispatcher} from "./CLIDispatcher";
import {AttachmentBuilder} from "./AttachmentBuilder";
import {GroupLinkStatus} from "../enums/GroupLinkStatus";

/**
 * A collector and editor of information related to the group
 */
export class GroupEditor {
    /**
     * {@link Group} being worked on
     */
    public initiator: Group;

    /**
     * ID of the group
     */
    public id: string;

    /**
     * Name of the group
     */
    public name: string;

    /**
     * Optional description for the group
     */
    public description?: string;

    /**
     * Whether this client is a member of the group or not
     */
    public isMember: boolean;

    /**
     * Whether this client has blocked the group or not
     */
    public isBlocked: boolean;

    /**
     * If disappearing messages are enabled, amount of seconds before a message disappears
     */
    public expirationSeconds: number;

    /**
     * List of members in the group
     */
    public members: User[];

    /**
     * List of members pending acceptance
     */
    public pendingMembers: User[];

    /**
     * List of members pending admin approval
     */
    public requestingMembers: User[];

    /**
     * List of admins
     */
    public admins: User[];

    /**
     * List of members banned from the group
     */
    public bannedMembers: User[];

    /**
     * Permission information
     */
    public permissions: GroupPermissions;

    /**
     * If enabled, link to the group
     */
    public inviteLink?: string;
    private client: Client;

    /**
     * @param initiator - The group being worked on
     * @param data - Data from signal-cli
     * @param client
     * @internal
     */
    constructor(initiator: Group, data: any, client: Client) {
        this.initiator = initiator;
        this.client = client;

        let group = data['result'].filter(i => i.id === this.initiator.id)[0];

        this.id = group.id;
        this.name = group.name;
        this.description = group.description ?? null;
        this.isMember = group.isMember;
        this.isBlocked = group.isBlocked;
        this.expirationSeconds = group.messageExpirationTime;
        this.members = group.members?.map(i => new User(i, UserDataType.MentionOrGroup, client));
        this.pendingMembers = group.pendingMembers?.map(i => new User(i, UserDataType.MentionOrGroup, client));
        this.requestingMembers = group.requestingMembers?.map(i => new User(i, UserDataType.MentionOrGroup, client));
        this.admins = group.admins?.map(i => new User(i, UserDataType.MentionOrGroup, client));
        this.bannedMembers = group.banned?.map(i => new User(i, UserDataType.MentionOrGroup, client));
        this.permissions = new GroupPermissions(group, this, client);
        this.inviteLink = group.groupInviteLink ?? null;
    }

    /**
     * Update the name of the group
     * @param name - The new group name
     */
    public async setName(name: string) {
        await CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, name: name
        }, this.client.process);

        this.name = name;
    }

    /**
     * Update the description of the group
     * @param description - The new group description
     */
    public async setDescription(description: string) {
        await CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, description: description
        }, this.client.process);

        this.description = description;
    }

    /**
     * Update the avatar of the group
     * @param avatar - The new group avatar
     */
    public async setAvatar(avatar: AttachmentBuilder) {
        await CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, avatar: avatar.uri
        }, this.client.process);
    }

    /**
     * Update the disappearing messages setting for the group
     * @param seconds - The time (in seconds) before a message gets deleted.
     * Use 0 to disable disappearing messages
     */
    public async setExpirationSeconds(seconds: number) {
        await CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, expiration: seconds
        }, this.client.process);

        this.expirationSeconds = seconds;
    }

    /**
     * Reset the group invite link and create a new one
     */
    public async resetInviteLink() {
        await CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, resetLink: true
        }, this.client.process);
    }

    /**
     * Change the status of the group invite link
     * @param status - The new group invite link status
     */
    public async setLinkStatus(status: GroupLinkStatus) {
        await CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, link: status === "withApproval" ? "enabled-with-approval" : status
        }, this.client.process);
    }
}