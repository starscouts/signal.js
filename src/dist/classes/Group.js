"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const Channel_1 = require("./Channel");
const CLIDispatcher_1 = require("./CLIDispatcher");
const SentDataMessage_1 = require("./SentDataMessage");
const GroupEditor_1 = require("./GroupEditor");
const MessageFormatting_1 = require("./MessageFormatting");
/**
 * A Signal group
 */
class Group extends Channel_1.Channel {
    /**
     * @param groupId - The ID of the group
     * @param client
     * @internal
     */
    constructor(groupId, client) {
        super();
        /**
         * Whether the channel is a group chat
         */
        this.group = true;
        this.id = groupId;
        this.client = client;
    }
    /**
     * Send a message to the channel
     * @param text - The text of the message, or an empty string
     * @param options - The optional options used to build the message
     */
    async send(text, options) {
        let groupData = await CLIDispatcher_1.CLIDispatcher.dispatch("listGroups", {}, this.client.process);
        let originalText = text;
        if (options?.markdown) {
            text = MessageFormatting_1.MessageFormatting.plainFromMarkdown(text);
            options.formatting = MessageFormatting_1.MessageFormatting.fromMarkdown(originalText);
        }
        let data = await CLIDispatcher_1.CLIDispatcher.dispatch("send", {
            groupId: this.id,
            recipient: groupData['result'].filter(i => i.id === this.id)[0].members.map(i => i.number),
            message: text,
            attachment: options?.attachments?.map(i => i.uri) ?? [],
            quoteTimestamp: options?.quote?.build().createdTimestamp,
            quoteAuthor: options?.quote?.build().author.number,
            quoteMessage: options?.quote?.build().content,
            editTimestamp: options?.original,
            previewUrl: options?.preview?.url,
            previewTitle: options?.preview?.title,
            previewDescription: options?.preview?.description,
            previewImage: options?.preview?.image,
            textStyle: options?.formatting?.rules.map(rule => rule.toCLIFormat()),
            mention: options?.mentions?.map(rule => rule.toCLIFormat())
        }, this.client.process);
        let timestamp = data.result?.timestamp;
        return new SentDataMessage_1.SentDataMessage(timestamp, this, this.client, text, options);
    }
    /**
     * Set the client's typing status for this channel
     * @param typing - Whether the client should be typing or not
     */
    async setTyping(typing) {
        let groupData = await CLIDispatcher_1.CLIDispatcher.dispatch("listGroups", {}, this.client.process);
        await CLIDispatcher_1.CLIDispatcher.dispatch("sendTyping", {
            groupId: this.id,
            recipient: groupData['result'].filter(i => i.id === this.id)[0].members.map(i => i.number),
            stop: !typing
        }, this.client.process);
    }
    /**
     * Send a sticker to this channel
     * @param sticker - The sticker to send
     */
    async sendSticker(sticker) {
        let groupData = await CLIDispatcher_1.CLIDispatcher.dispatch("listGroups", {}, this.client.process);
        await CLIDispatcher_1.CLIDispatcher.dispatch("send", {
            groupId: this.id,
            recipient: groupData['result'].filter(i => i.id === this.id)[0].members.map(i => i.number),
            sticker: sticker.pack.id + ":" + sticker.id
        }, this.client.process);
    }
    /**
     * Block or unblock the group
     * @param blocked - Whether the group should be blocked or not
     */
    async setBlocked(blocked) {
        let groupData = await CLIDispatcher_1.CLIDispatcher.dispatch("listGroups", {}, this.client.process);
        if (blocked) {
            await CLIDispatcher_1.CLIDispatcher.dispatch("block", {
                groupId: this.id,
                recipient: groupData['result'].filter(i => i.id === this.id)[0].members.map(i => i.number)
            }, this.client.process);
        }
        else {
            await CLIDispatcher_1.CLIDispatcher.dispatch("unblock", {
                groupId: this.id,
                recipient: groupData['result'].filter(i => i.id === this.id)[0].members.map(i => i.number)
            }, this.client.process);
        }
    }
    /**
     * Edit the group's information
     */
    async editor() {
        return new GroupEditor_1.GroupEditor(this, await CLIDispatcher_1.CLIDispatcher.dispatch("listGroups", {}, this.client.process), this.client);
    }
    /**
     * Add one or more admins to the group
     * @param users - The admin(s) to add
     */
    async addAdmin(...users) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, admin: users.map(i => i.number)
        }, this.client.process);
    }
    /**
     * Remove one or more admins
     * @param users - The admin(s) to remove
     */
    async removeAdmin(...users) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, removeAdmin: users.map(i => i.number)
        }, this.client.process);
    }
    /**
     * Add one or more members to the group
     * @param users - The member(s) to add
     */
    async addMember(...users) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, member: users.map(i => i.number)
        }, this.client.process);
    }
    /**
     * Remove (kick) one or more members from the group
     * @param users - The member(s) to remove
     */
    async removeMember(...users) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, removeMember: users.map(i => i.number)
        }, this.client.process);
    }
    /**
     * Permanently ban one or more members from the group
     * @param users - The member(s) to ban
     */
    async banMember(...users) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, ban: users.map(i => i.number)
        }, this.client.process);
    }
    /**
     * Unban one or more permanently banned members from the group
     * @param users - The member(s) to unban
     */
    async unbanMember(...users) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, unban: users.map(i => i.number)
        }, this.client.process);
    }
    /**
     * Leave the group
     *
     * If the client is an administrator of the group, `successorAdmins` has to be set
     * @param deleteLocalData - Whether local client data about the group should be deleted
     * @param successorAdmins - One or more member(s) to make group admins after the client
     * leaves the group, in case this client is the only admin
     */
    async leave(deleteLocalData = false, successorAdmins) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("quitGroup", {
            groupId: this.id, admin: successorAdmins?.map(i => i.number), delete: deleteLocalData
        }, this.client.process);
    }
}
exports.Group = Group;
//# sourceMappingURL=Group.js.map