"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const child_process_1 = require("child_process");
const CLIEvent_1 = require("./CLIEvent");
const SignalCLIError_1 = require("./SignalCLIError");
const events_1 = require("events");
const Group_1 = require("./Group");
const CLIDispatcher_1 = require("./CLIDispatcher");
const Device_1 = require("./Device");
const UserProfile_1 = require("./UserProfile");
const Identity_1 = require("./Identity");
const StickerPack_1 = require("./StickerPack");
const ClientUser_1 = require("./ClientUser");
const signal_cli_1 = __importDefault(require("@equestria.dev/signal-cli"));
/**
 * The base Signal.js client interface
 */
class Client extends events_1.EventEmitter {
    /**
     * @param config - The configuration to use with signal-cli
     */
    constructor(config) {
        super();
        /**
         * An {@link ObjectCache} for the registered sticker packs
         * @internal
         */
        this.stickerPacks = {};
        /**
         * Whether verbose mode (logging events) should be enabled
         */
        this.verbose = false;
        /**
         * Whether ignoring events sent while the client was offline
         * is enabled
         */
        this.ignoreOldEvents = true;
        let command = config.signalCli ?? signal_cli_1.default;
        let parameters = [];
        if (config.system?.args)
            parameters.push(...config.system.args);
        if (config.scrubLog)
            parameters.push("--scrub-log");
        if (config.configPath)
            parameters.push("--config", config.configPath);
        if (config.cliLog)
            parameters.push("--log-file", config.cliLog);
        if (config.environment)
            parameters.push("--service-environment", config.environment);
        if (config.trustLevel)
            parameters.push("--trust-new-identities", config.trustLevel);
        if (config.logEvents)
            this.verbose = true;
        if (typeof config.ignoreOldEvents === "boolean")
            this.ignoreOldEvents = config.ignoreOldEvents;
        parameters.push("--account", config.account);
        parameters.push("jsonRpc");
        let lastData;
        this.process = (0, child_process_1.spawn)(command, parameters, config.system?.spawn ?? {
            stdio: "pipe", windowsHide: true
        });
        this.process.stdout.on('data', (chunk) => {
            if (chunk.toString().trim().length === 0)
                return;
            for (let line of chunk.toString().trim().replaceAll("\r\n").split("\n")) {
                try {
                    JSON.parse(line);
                    lastData = null;
                }
                catch (e) {
                    if (lastData) {
                        line = lastData + line;
                        try {
                            JSON.parse(line);
                            lastData = null;
                        }
                        catch (e) {
                            lastData = line;
                        }
                    }
                    else {
                        lastData = line;
                    }
                }
                if (!lastData) {
                    if (JSON.parse(line).params) {
                        let data = JSON.parse(line);
                        if (config.logEvents)
                            console.log(data);
                        CLIEvent_1.CLIEvent.fromEvent(this, data);
                    }
                }
            }
        });
        this.process.stderr.on('data', (chunk) => {
            if (chunk.toString().trim().startsWith("INFO  "))
                return;
            if (chunk.toString().trim().startsWith("WARN  "))
                return;
            throw new SignalCLIError_1.SignalCLIError(chunk.toString(), command, parameters);
        });
        this.user = new ClientUser_1.ClientUser(this);
    }
    /**
     * Create a new {@link Group}
     * @param name - An optional name to give the group
     */
    async createGroup(name) {
        let data = await CLIDispatcher_1.CLIDispatcher.dispatch("updateGroup", {
            name: name ?? null
        }, this.process);
        return new Group_1.Group(data?.result?.groupId, this);
    }
    /**
     * Join a group from an invite link
     * @param url - The URL of the invite link to use
     */
    async joinGroup(url) {
        let data = await CLIDispatcher_1.CLIDispatcher.dispatch("joinGroup", {
            uri: url ?? null
        }, this.process);
        return new Group_1.Group(data?.result?.groupId, this);
    }
    /**
     * Check if a number is a Signal user
     * @param number - The number to check
     */
    async isNumberOnSignal(number) {
        let data = await CLIDispatcher_1.CLIDispatcher.dispatch("getUserStatus", {
            recipient: number
        }, this.process);
        return data?.result[0]?.isRegistered;
    }
    /**
     * Get a list of {@link Group}s the client is part of
     */
    async getGroups() {
        return (await CLIDispatcher_1.CLIDispatcher.dispatch("listGroups", {}, this.process))['result'].map(i => new Group_1.Group(i.id, this));
    }
    /**
     * Get a list of {@link Device}s associated with the client
     */
    async getDevices() {
        return (await CLIDispatcher_1.CLIDispatcher.dispatch("listDevices", {}, this.process))['result'].map(i => new Device_1.Device(i, this));
    }
    /**
     * Associate a new device with this Signal account
     * @param uri - The URI corresponding to the QR code on the device
     */
    async addDevice(uri) {
        return new Device_1.Device((await CLIDispatcher_1.CLIDispatcher.dispatch("addDevice", {
            uri: uri
        }, this.process))['result'][0], this);
    }
    /**
     * Get a list of {@link UserProfile}s the client knows about
     */
    async getContacts() {
        return (await CLIDispatcher_1.CLIDispatcher.dispatch("listContacts", {}, this.process))['result'].map(i => new UserProfile_1.UserProfile(i, this));
    }
    /**
     * Get a list of {@link Identity} the client knows about
     */
    async getIdentities() {
        return (await CLIDispatcher_1.CLIDispatcher.dispatch("listIdentities", {}, this.process))['result'].filter(i => i.number && i.number.trim() !== "").map(i => new Identity_1.Identity(i, this));
    }
    /**
     * Get a list of {@link StickerPack}s the client has access to
     */
    async getStickerPacks() {
        let list = (await CLIDispatcher_1.CLIDispatcher.dispatch("listStickerPacks", {}, this.process))['result'];
        this.stickerPacks['list'] = list;
        return list.map(i => new StickerPack_1.StickerPack(i, this));
    }
    /**
     * Change a shared Signal preference
     * @param preference - The name of the preference to change
     * @param value - The new value of that preference
     */
    async setSharedPreference(preference, value) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateConfiguration", {
            [preference]: value
        }, this.process);
    }
    /**
     * Change the name of this device on the account
     * @param name
     */
    async setDeviceName(name) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateAccount", {
            deviceName: name
        }, this.process);
    }
    /**
     * Set a PIN code to lock account registration
     * @param pin - The PIN code to set
     */
    async setRegistrationPin(pin) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("setPin", {
            pin
        }, this.process);
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map