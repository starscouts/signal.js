"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupEditor = void 0;
const User_1 = require("./User");
const GroupPermissions_1 = require("./GroupPermissions");
const UserDataType_1 = require("../enums/UserDataType");
const CLIDispatcher_1 = require("./CLIDispatcher");
/**
 * A collector and editor of information related to the group
 */
class GroupEditor {
    /**
     * @param initiator - The group being worked on
     * @param data - Data from signal-cli
     * @param client
     * @internal
     */
    constructor(initiator, data, client) {
        this.initiator = initiator;
        this.client = client;
        let group = data['result'].filter(i => i.id === this.initiator.id)[0];
        this.id = group.id;
        this.name = group.name;
        this.description = group.description ?? null;
        this.isMember = group.isMember;
        this.isBlocked = group.isBlocked;
        this.expirationSeconds = group.messageExpirationTime;
        this.members = group.members?.map(i => new User_1.User(i, UserDataType_1.UserDataType.MentionOrGroup, client));
        this.pendingMembers = group.pendingMembers?.map(i => new User_1.User(i, UserDataType_1.UserDataType.MentionOrGroup, client));
        this.requestingMembers = group.requestingMembers?.map(i => new User_1.User(i, UserDataType_1.UserDataType.MentionOrGroup, client));
        this.admins = group.admins?.map(i => new User_1.User(i, UserDataType_1.UserDataType.MentionOrGroup, client));
        this.bannedMembers = group.banned?.map(i => new User_1.User(i, UserDataType_1.UserDataType.MentionOrGroup, client));
        this.permissions = new GroupPermissions_1.GroupPermissions(group, this, client);
        this.inviteLink = group.groupInviteLink ?? null;
    }
    /**
     * Update the name of the group
     * @param name - The new group name
     */
    async setName(name) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, name: name
        }, this.client.process);
        this.name = name;
    }
    /**
     * Update the description of the group
     * @param description - The new group description
     */
    async setDescription(description) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, description: description
        }, this.client.process);
        this.description = description;
    }
    /**
     * Update the avatar of the group
     * @param avatar - The new group avatar
     */
    async setAvatar(avatar) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, avatar: avatar.uri
        }, this.client.process);
    }
    /**
     * Update the disappearing messages setting for the group
     * @param seconds - The time (in seconds) before a message gets deleted.
     * Use 0 to disable disappearing messages
     */
    async setExpirationSeconds(seconds) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, expiration: seconds
        }, this.client.process);
        this.expirationSeconds = seconds;
    }
    /**
     * Reset the group invite link and create a new one
     */
    async resetInviteLink() {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, resetLink: true
        }, this.client.process);
    }
    /**
     * Change the status of the group invite link
     * @param status - The new group invite link status
     */
    async setLinkStatus(status) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, link: status === "withApproval" ? "enabled-with-approval" : status
        }, this.client.process);
    }
}
exports.GroupEditor = GroupEditor;
//# sourceMappingURL=GroupEditor.js.map