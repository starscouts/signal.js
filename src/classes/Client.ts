import {IConfig} from "../types/IConfig";
import {ChildProcess, spawn} from "child_process";
import {ICLIEvent} from "../types/ICLIEvent";
import {CLIEvent} from "./CLIEvent";
import {SignalCLIError} from "./SignalCLIError";
import {EventEmitter} from "events";
import {DMTypingMessage} from "./DMTypingMessage";
import {GroupTypingMessage} from "./GroupTypingMessage";
import {DMDataMessage} from "./DMDataMessage";
import {GroupDataMessage} from "./GroupDataMessage";
import {GroupReactionMessage} from "./GroupReactionMessage";
import {DMReactionMessage} from "./DMReactionMessage";
import {ObjectCache} from "./ObjectCache";
import {GroupStickerMessage} from "./GroupStickerMessage";
import {DMStickerMessage} from "./DMStickerMessage";
import {DMEditMessage} from "./DMEditMessage";
import {GroupEditMessage} from "./GroupEditMessage";
import {GroupDeleteMessage} from "./GroupDeleteMessage";
import {DMDeleteMessage} from "./DMDeleteMessage";
import {Group} from "./Group";
import {CLIDispatcher} from "./CLIDispatcher";
import {Device} from "./Device";
import {UserProfile} from "./UserProfile";
import {Identity} from "./Identity";
import {StickerPack} from "./StickerPack";
import {ClientUser} from "./ClientUser";
import {SharedPreference} from "../enums/SharedPreference";
import signalCli from '@equestria.dev/signal-cli';

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
export class Client extends EventEmitter {
    /**
     * The signal-cli process
     */
    public process: ChildProcess;

    /**
     * An {@link ObjectCache} for the registered sticker packs
     * @internal
     */
    public stickerPacks: ObjectCache = {};

    /**
     * Whether verbose mode (logging events) should be enabled
     */
    public verbose: boolean = false;

    /**
     * The user configuration for this client
     */
    public user: ClientUser;

    /**
     * Whether ignoring events sent while the client was offline
     * is enabled
     */
    public ignoreOldEvents: boolean = true;

    /**
     * @param config - The configuration to use with signal-cli
     */
    constructor(config: IConfig) {
        super();

        let command: string = config.signalCli ?? signalCli;
        let parameters: string[] = [];

        if (config.system?.args) parameters.push(...config.system.args);

        if (config.scrubLog) parameters.push("--scrub-log");
        if (config.configPath) parameters.push("--config", config.configPath);
        if (config.cliLog) parameters.push("--log-file", config.cliLog);
        if (config.environment) parameters.push("--service-environment", config.environment);
        if (config.trustLevel) parameters.push("--trust-new-identities", config.trustLevel);
        if (config.logEvents) this.verbose = true;
        if (typeof config.ignoreOldEvents === "boolean") this.ignoreOldEvents = config.ignoreOldEvents;

        parameters.push("--account", config.account);
        parameters.push("jsonRpc");

        let lastData;

        this.process = spawn(command, parameters, config.system?.spawn ?? {
            stdio: "pipe", windowsHide: true
        });

        this.process.stdout.on('data', (chunk) => {
            if (chunk.toString().trim().length === 0) return;

            for (let line of chunk.toString().trim().replaceAll("\r\n").split("\n")) {
                try {
                    JSON.parse(line);
                    lastData = null;
                } catch (e) {
                    if (lastData) {
                        line = lastData + line;

                        try {
                            JSON.parse(line);
                            lastData = null;
                        } catch (e) {
                            lastData = line;
                        }
                    } else {
                        lastData = line;
                    }
                }

                if (!lastData) {
                    if (JSON.parse(line).params) {
                        let data: ICLIEvent = JSON.parse(line);
                        if (config.logEvents) console.log(data);
                        CLIEvent.fromEvent(this, data);
                    }
                }
            }
        });

        this.process.stderr.on('data', (chunk) => {
            if (chunk.toString().trim().startsWith("INFO  ")) return;
            if (chunk.toString().trim().startsWith("WARN  ")) return;
            throw new SignalCLIError(chunk.toString(), command, parameters)
        });

        this.user = new ClientUser(this);
    }

    /**
     * Create a new {@link Group}
     * @param name - An optional name to give the group
     */
    public async createGroup(name?: string): Promise<Group> {
        let data = await CLIDispatcher.dispatch("updateGroup", {
            name: name ?? null
        }, this.process);

        return new Group(data?.result?.groupId, this);
    }

    /**
     * Join a group from an invite link
     * @param url - The URL of the invite link to use
     */
    public async joinGroup(url: string): Promise<Group> {
        let data = await CLIDispatcher.dispatch("joinGroup", {
            uri: url ?? null
        }, this.process);

        return new Group(data?.result?.groupId, this);
    }

    /**
     * Check if a number is a Signal user
     * @param number - The number to check
     */
    public async isNumberOnSignal(number: string): Promise<boolean> {
        let data = await CLIDispatcher.dispatch("getUserStatus", {
            recipient: number
        }, this.process);

        return data?.result[0]?.isRegistered;
    }

    /**
     * Get a list of {@link Group}s the client is part of
     */
    public async getGroups(): Promise<Group[]> {
        return (await CLIDispatcher.dispatch("listGroups", {}, this.process))['result'].map(i => new Group(i.id, this));
    }

    /**
     * Get a list of {@link Device}s associated with the client
     */
    public async getDevices(): Promise<Device[]> {
        return (await CLIDispatcher.dispatch("listDevices", {}, this.process))['result'].map(i => new Device(i, this));
    }

    /**
     * Associate a new device with this Signal account
     * @param uri - The URI corresponding to the QR code on the device
     */
    public async addDevice(uri: string): Promise<Device> {
        return new Device((await CLIDispatcher.dispatch("addDevice", {
            uri: uri
        }, this.process))['result'][0], this);
    }

    /**
     * Get a list of {@link UserProfile}s the client knows about
     */
    public async getContacts(): Promise<UserProfile[]> {
        return (await CLIDispatcher.dispatch("listContacts", {}, this.process))['result'].map(i => new UserProfile(i, this));
    }

    /**
     * Get a list of {@link Identity} the client knows about
     */
    public async getIdentities(): Promise<Identity[]> {
        return (await CLIDispatcher.dispatch("listIdentities", {}, this.process))['result'].filter(i => i.number && i.number.trim() !== "").map(i => new Identity(i, this));
    }

    /**
     * Get a list of {@link StickerPack}s the client has access to
     */
    public async getStickerPacks(): Promise<StickerPack[]> {
        let list = (await CLIDispatcher.dispatch("listStickerPacks", {}, this.process))['result'];

        this.stickerPacks['list'] = list;
        return list.map(i => new StickerPack(i, this));
    }

    /**
     * Change a shared Signal preference
     * @param preference - The name of the preference to change
     * @param value - The new value of that preference
     */
    public async setSharedPreference(preference: SharedPreference, value: boolean) {
        await CLIDispatcher.dispatch("updateConfiguration", {
            [preference]: value
        }, this.process);
    }

    /**
     * Change the name of this device on the account
     * @param name
     */
    public async setDeviceName(name: string) {
        await CLIDispatcher.dispatch("updateAccount", {
            deviceName: name
        }, this.process);
    }

    /**
     * Set a PIN code to lock account registration
     * @param pin - The PIN code to set
     */
    public async setRegistrationPin(pin: number) {
        await CLIDispatcher.dispatch("setPin", {
            pin
        }, this.process);
    }
}