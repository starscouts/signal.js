import { Channel } from "./Channel";
import { Client } from "./Client";
import { IChatMessageOptions } from "../types/IChatMessageOptions";
import { SentDataMessage } from "./SentDataMessage";
import { Sticker } from "./Sticker";
import { GroupEditor } from "./GroupEditor";
import { User } from "./User";
/**
 * A Signal group
 */
export declare class Group extends Channel {
    /**
     * Whether the channel is a group chat
     */
    group: boolean;
    private client;
    /**
     * @param groupId - The ID of the group
     * @param client
     * @internal
     */
    constructor(groupId: string, client: Client);
    /**
     * Send a message to the channel
     * @param text - The text of the message, or an empty string
     * @param options - The optional options used to build the message
     */
    send(text: string, options?: IChatMessageOptions): Promise<SentDataMessage>;
    /**
     * Set the client's typing status for this channel
     * @param typing - Whether the client should be typing or not
     */
    setTyping(typing: boolean): Promise<void>;
    /**
     * Send a sticker to this channel
     * @param sticker - The sticker to send
     */
    sendSticker(sticker: Sticker): Promise<void>;
    /**
     * Block or unblock the group
     * @param blocked - Whether the group should be blocked or not
     */
    setBlocked(blocked: boolean): Promise<void>;
    /**
     * Edit the group's information
     */
    editor(): Promise<GroupEditor>;
    /**
     * Add one or more admins to the group
     * @param users - The admin(s) to add
     */
    addAdmin(...users: User[]): Promise<void>;
    /**
     * Remove one or more admins
     * @param users - The admin(s) to remove
     */
    removeAdmin(...users: User[]): Promise<void>;
    /**
     * Add one or more members to the group
     * @param users - The member(s) to add
     */
    addMember(...users: User[]): Promise<void>;
    /**
     * Remove (kick) one or more members from the group
     * @param users - The member(s) to remove
     */
    removeMember(...users: User[]): Promise<void>;
    /**
     * Permanently ban one or more members from the group
     * @param users - The member(s) to ban
     */
    banMember(...users: User[]): Promise<void>;
    /**
     * Unban one or more permanently banned members from the group
     * @param users - The member(s) to unban
     */
    unbanMember(...users: User[]): Promise<void>;
    /**
     * Leave the group
     *
     * If the client is an administrator of the group, `successorAdmins` has to be set
     * @param deleteLocalData - Whether local client data about the group should be deleted
     * @param successorAdmins - One or more member(s) to make group admins after the client
     * leaves the group, in case this client is the only admin
     */
    leave(deleteLocalData?: boolean, successorAdmins?: User[]): Promise<void>;
}
