"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const UserDataType_1 = require("../enums/UserDataType");
const CLIDispatcher_1 = require("./CLIDispatcher");
const DM_1 = require("./DM");
/**
 * A Signal user
 */
class User {
    /**
     * @param data - Sufficient data to create a {@link User}
     * @param dataType - The type of data used to create the {@link User}
     * @param client
     * @internal
     */
    constructor(data, dataType, client) {
        /**
         * The user's phone number
         */
        this.number = null;
        /**
         * The user's nickname they set
         */
        this.nickName = null;
        /**
         * The user's UUID
         */
        this.uuid = null;
        /**
         * The ID of the device the user is on
         */
        this.device = null;
        this.client = client;
        if (dataType === UserDataType_1.UserDataType.Envelope) {
            if (data.sourceNumber && typeof data.sourceNumber === "string")
                this.number = data.sourceNumber;
            if (data.sourceName && typeof data.sourceName === "string")
                this.nickName = data.sourceName;
            if (data.sourceUuid && typeof data.sourceUuid === "string")
                this.uuid = data.sourceUuid;
            if (data.sourceDevice && typeof data.sourceDevice === "number")
                this.device = data.sourceDevice;
        }
        else if (dataType === UserDataType_1.UserDataType.Quote) {
            if (data.authorNumber && typeof data.authorNumber === "string")
                this.number = data.authorNumber;
            if (data.authorUuid && typeof data.authorUuid === "string")
                this.uuid = data.authorUuid;
        }
        else if (dataType === UserDataType_1.UserDataType.Reaction) {
            if (data.targetAuthorNumber && typeof data.targetAuthorNumber === "string")
                this.number = data.targetAuthorNumber;
            if (data.targetAuthorUuid && typeof data.targetAuthorUuid === "string")
                this.uuid = data.targetAuthorUuid;
        }
        else if (dataType === UserDataType_1.UserDataType.MentionOrGroup || dataType === UserDataType_1.UserDataType.ProfileOrIdentity) {
            if (data.number && typeof data.number === "string")
                this.number = data.number;
            if (data.uuid && typeof data.uuid === "string")
                this.uuid = data.uuid;
            if (data.name && typeof data.name === "string")
                this.nickName = data.name;
        }
        else if (dataType === UserDataType_1.UserDataType.Number) {
            if (data && typeof data === "string")
                this.number = data;
        }
    }
    /**
     * Create a new {@link User} from a phone number
     * @param number - The phone number to use
     * @param client
     */
    static fromNumber(number, client) {
        return new User(number, UserDataType_1.UserDataType.Number, client);
    }
    /**
     * Create a {@link DM} with this user
     */
    createDM() {
        return new DM_1.DM(this.uuid ?? null, this.number, this.client);
    }
    /**
     * Block or unblock this user
     * @param blocked - Whether the user should be blocked or not
     */
    async setBlocked(blocked) {
        if (blocked) {
            await CLIDispatcher_1.CLIDispatcher.dispatch("block", {
                recipient: [this.number]
            }, this.client.process);
        }
        else {
            await CLIDispatcher_1.CLIDispatcher.dispatch("unblock", {
                recipient: [this.number]
            }, this.client.process);
        }
    }
    /**
     * Verify the user's safety number
     *
     * @param safetyNumber - The user's safety number.
     * If not present, all known keys will be trusted
     */
    async verify(safetyNumber) {
        if (safetyNumber) {
            await CLIDispatcher_1.CLIDispatcher.dispatch("trust", {
                verifiedSafetyNumber: safetyNumber.replaceAll(" ", "").replaceAll("\r\n", "").replaceAll("\n", ""),
                recipient: [this.number]
            }, this.client.process);
        }
        else {
            await CLIDispatcher_1.CLIDispatcher.dispatch("trust", {
                trustAllKnownKeys: true, recipient: [this.number]
            }, this.client.process);
        }
    }
    /**
     * Add the user to the contacts list
     * @param name - The name to give the user
     */
    async addToContacts(name) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateContact", {
            name: name, recipient: [this.number]
        }, this.client.process);
        await CLIDispatcher_1.CLIDispatcher.dispatch("sendContacts", {}, this.client.process);
    }
    /**
     * Remove the user from the contact list
     */
    async removeFromContacts() {
        await CLIDispatcher_1.CLIDispatcher.dispatch("removeContact", {
            recipient: [this.number]
        }, this.client.process);
        await CLIDispatcher_1.CLIDispatcher.dispatch("sendContacts", {}, this.client.process);
    }
    /**
     * Change the disappearing messages expiration time
     * @param time - The time (in seconds) before a message gets deleted.
     * Use 0 to disable disappearing messages
     */
    async setDisappearingMessagesTime(time) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateContact", {
            expiration: time ?? 0, recipient: [this.number]
        }, this.client.process);
        await CLIDispatcher_1.CLIDispatcher.dispatch("sendContacts", {}, this.client.process);
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map