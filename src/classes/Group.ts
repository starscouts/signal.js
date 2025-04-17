import {Channel} from "./Channel";
import {Client} from "./Client";
import {CLIDispatcher} from "./CLIDispatcher";
import {IChatMessageOptions} from "../types/IChatMessageOptions";
import {SentDataMessage} from "./SentDataMessage";
import {Sticker} from "./Sticker";
import {GroupEditor} from "./GroupEditor";
import {User} from "./User";
import {MessageFormatting} from "./MessageFormatting";

/**
 * A Signal group
 */
export class Group extends Channel {
    /**
     * Whether the channel is a group chat
     */
    public group: boolean = true;
    private client: Client;

    /**
     * @param groupId - The ID of the group
     * @param client
     * @internal
     */
    constructor(groupId: string, client: Client) {
        super();
        this.id = groupId;
        this.client = client;
    }

    /**
     * Send a message to the channel
     * @param text - The text of the message, or an empty string
     * @param options - The optional options used to build the message
     */
    public async send(text: string, options?: IChatMessageOptions): Promise<SentDataMessage> {
        let groupData = await CLIDispatcher.dispatch("listGroups", {}, this.client.process);
        let originalText = text;

        if (options?.markdown) {
            text = MessageFormatting.plainFromMarkdown(text);
            options.formatting = MessageFormatting.fromMarkdown(originalText);
        }

        let data = await CLIDispatcher.dispatch("send", {
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
        return new SentDataMessage(timestamp, this, this.client, text, options);
    }

    /**
     * Set the client's typing status for this channel
     * @param typing - Whether the client should be typing or not
     */
    public async setTyping(typing: boolean): Promise<void> {
        let groupData = await CLIDispatcher.dispatch("listGroups", {}, this.client.process);

        await CLIDispatcher.dispatch("sendTyping", {
            groupId: this.id,
            recipient: groupData['result'].filter(i => i.id === this.id)[0].members.map(i => i.number),
            stop: !typing
        }, this.client.process);
    }

    /**
     * Send a sticker to this channel
     * @param sticker - The sticker to send
     */
    public async sendSticker(sticker: Sticker): Promise<void> {
        let groupData = await CLIDispatcher.dispatch("listGroups", {}, this.client.process);

        await CLIDispatcher.dispatch("send", {
            groupId: this.id,
            recipient: groupData['result'].filter(i => i.id === this.id)[0].members.map(i => i.number),
            sticker: sticker.pack.id + ":" + sticker.id
        }, this.client.process);
    }

    /**
     * Block or unblock the group
     * @param blocked - Whether the group should be blocked or not
     */
    public async setBlocked(blocked: boolean) {
        let groupData = await CLIDispatcher.dispatch("listGroups", {}, this.client.process);

        if (blocked) {
            await CLIDispatcher.dispatch("block", {
                groupId: this.id,
                recipient: groupData['result'].filter(i => i.id === this.id)[0].members.map(i => i.number)
            }, this.client.process);
        } else {
            await CLIDispatcher.dispatch("unblock", {
                groupId: this.id,
                recipient: groupData['result'].filter(i => i.id === this.id)[0].members.map(i => i.number)
            }, this.client.process);
        }
    }

    /**
     * Edit the group's information
     */
    public async editor() {
        return new GroupEditor(this, await CLIDispatcher.dispatch("listGroups", {}, this.client.process), this.client);
    }

    /**
     * Add one or more admins to the group
     * @param users - The admin(s) to add
     */
    public async addAdmin(...users: User[]) {
        await CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, admin: users.map(i => i.number)
        }, this.client.process);
    }

    /**
     * Remove one or more admins
     * @param users - The admin(s) to remove
     */
    public async removeAdmin(...users: User[]) {
        await CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, removeAdmin: users.map(i => i.number)
        }, this.client.process);
    }

    /**
     * Add one or more members to the group
     * @param users - The member(s) to add
     */
    public async addMember(...users: User[]) {
        await CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, member: users.map(i => i.number)
        }, this.client.process);
    }

    /**
     * Remove (kick) one or more members from the group
     * @param users - The member(s) to remove
     */
    public async removeMember(...users: User[]) {
        await CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, removeMember: users.map(i => i.number)
        }, this.client.process);
    }

    /**
     * Permanently ban one or more members from the group
     * @param users - The member(s) to ban
     */
    public async banMember(...users: User[]) {
        await CLIDispatcher.dispatch("updateGroup", {
            groupId: this.id, ban: users.map(i => i.number)
        }, this.client.process);
    }

    /**
     * Unban one or more permanently banned members from the group
     * @param users - The member(s) to unban
     */
    public async unbanMember(...users: User[]) {
        await CLIDispatcher.dispatch("updateGroup", {
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
    public async leave(deleteLocalData: boolean = false, successorAdmins?: User[]) {
        await CLIDispatcher.dispatch("quitGroup", {
            groupId: this.id, admin: successorAdmins?.map(i => i.number), delete: deleteLocalData
        }, this.client.process);
    }
}