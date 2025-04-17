/// <reference types="node" />
/// <reference types="node" />
import { IConfig } from "../types/IConfig";
import { ChildProcess } from "child_process";
import { ICLIEvent } from "../types/ICLIEvent";
import { EventEmitter } from "events";
import { DMTypingMessage } from "./DMTypingMessage";
import { GroupTypingMessage } from "./GroupTypingMessage";
import { DMDataMessage } from "./DMDataMessage";
import { GroupDataMessage } from "./GroupDataMessage";
import { GroupReactionMessage } from "./GroupReactionMessage";
import { DMReactionMessage } from "./DMReactionMessage";
import { ObjectCache } from "./ObjectCache";
import { GroupStickerMessage } from "./GroupStickerMessage";
import { DMStickerMessage } from "./DMStickerMessage";
import { DMEditMessage } from "./DMEditMessage";
import { GroupEditMessage } from "./GroupEditMessage";
import { GroupDeleteMessage } from "./GroupDeleteMessage";
import { DMDeleteMessage } from "./DMDeleteMessage";
import { Group } from "./Group";
import { Device } from "./Device";
import { UserProfile } from "./UserProfile";
import { Identity } from "./Identity";
import { StickerPack } from "./StickerPack";
import { ClientUser } from "./ClientUser";
import { SharedPreference } from "../enums/SharedPreference";
export declare interface Client {
    /**
     * Emitted when a Signal event, even if unsupported, is received by signal-cli
     * @event Client#cliEvent
     */
    on(event: "cliEvent", listener: (event: ICLIEvent) => void): this;
    /**
     * Emitted when a typing message is received
     * @event Client#typingMessage
     */
    on(event: "typingMessage", listener: (message: GroupTypingMessage | DMTypingMessage) => void): this;
    /**
     * Emitted when a data (text) message is received
     * @event Client#message
     */
    on(event: "message", listener: (message: GroupDataMessage | DMDataMessage) => void): this;
    /**
     * Emitted when a message is edited
     * @event Client#editMessage
     */
    on(event: "editMessage", listener: (message: GroupEditMessage | DMEditMessage) => void): this;
    /**
     * Emitted when a reaction is added or removed to/from a message
     * @event Client#reaction
     */
    on(event: "reaction", listener: (message: GroupReactionMessage | DMReactionMessage) => void): this;
    /**
     * Emitted when a reaction is added to a message
     * @event Client#reactionAdd
     */
    on(event: "reactionAdd", listener: (message: GroupReactionMessage | DMReactionMessage) => void): this;
    /**
     * Emitted when a reaction is removed from a message
     * @event Client#reactionRemove
     */
    on(event: "reactionRemove", listener: (message: GroupReactionMessage | DMReactionMessage) => void): this;
    /**
     * Emitted when a sticker message is received
     * @event Client#sticker
     */
    on(event: "sticker", listener: (message: GroupStickerMessage | DMStickerMessage) => void): this;
    /**
     * Emitted when a message in a channel gets deleted
     * @event Client#deleteMessage
     */
    on(event: "deleteMessage", listener: (message: GroupDeleteMessage | DMDeleteMessage) => void): this;
    /**
     * Emitted when a group's information gets updated
     * @event Client#groupUpdate
     */
    on(event: "groupUpdate", listener: (group: Group) => void): this;
}
/**
 * The base Signal.js client interface
 */
export declare class Client extends EventEmitter {
    /**
     * The signal-cli process
     */
    process: ChildProcess;
    /**
     * An {@link ObjectCache} for the registered sticker packs
     * @internal
     */
    stickerPacks: ObjectCache;
    /**
     * Whether verbose mode (logging events) should be enabled
     */
    verbose: boolean;
    /**
     * The user configuration for this client
     */
    user: ClientUser;
    /**
     * Whether ignoring events sent while the client was offline
     * is enabled
     */
    ignoreOldEvents: boolean;
    /**
     * @param config - The configuration to use with signal-cli
     */
    constructor(config: IConfig);
    /**
     * Create a new {@link Group}
     * @param name - An optional name to give the group
     */
    createGroup(name?: string): Promise<Group>;
    /**
     * Join a group from an invite link
     * @param url - The URL of the invite link to use
     */
    joinGroup(url: string): Promise<Group>;
    /**
     * Check if a number is a Signal user
     * @param number - The number to check
     */
    isNumberOnSignal(number: string): Promise<boolean>;
    /**
     * Get a list of {@link Group}s the client is part of
     */
    getGroups(): Promise<Group[]>;
    /**
     * Get a list of {@link Device}s associated with the client
     */
    getDevices(): Promise<Device[]>;
    /**
     * Associate a new device with this Signal account
     * @param uri - The URI corresponding to the QR code on the device
     */
    addDevice(uri: string): Promise<Device>;
    /**
     * Get a list of {@link UserProfile}s the client knows about
     */
    getContacts(): Promise<UserProfile[]>;
    /**
     * Get a list of {@link Identity} the client knows about
     */
    getIdentities(): Promise<Identity[]>;
    /**
     * Get a list of {@link StickerPack}s the client has access to
     */
    getStickerPacks(): Promise<StickerPack[]>;
    /**
     * Change a shared Signal preference
     * @param preference - The name of the preference to change
     * @param value - The new value of that preference
     */
    setSharedPreference(preference: SharedPreference, value: boolean): Promise<void>;
    /**
     * Change the name of this device on the account
     * @param name
     */
    setDeviceName(name: string): Promise<void>;
    /**
     * Set a PIN code to lock account registration
     * @param pin - The PIN code to set
     */
    setRegistrationPin(pin: number): Promise<void>;
}
