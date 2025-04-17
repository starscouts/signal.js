"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientUser = void 0;
const CLIDispatcher_1 = require("./CLIDispatcher");
const AttachmentBuilder_1 = require("./AttachmentBuilder");
/**
 * A Signal user to associate with a {@link Client}
 */
class ClientUser {
    /**
     * @internal
     * @param client
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Remove the currently set username
     */
    async deleteUserName() {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateAccount", {
            deleteUsername: true
        }, this.client.process);
    }
    /**
     * Change the username used by this account
     * @param userName - The new username to use
     */
    async setUserName(userName) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateAccount", {
            username: userName
        }, this.client.process);
    }
    /**
     * Change the user's first name, cannot be empty
     * @param name - The new first name to use
     */
    async setFirstName(name) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateProfile", {
            givenName: name
        }, this.client.process);
    }
    /**
     * Change the user's last name, can also be an empty string
     * @param name - The new last name to use
     */
    async setLastName(name) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateProfile", {
            familyName: name
        }, this.client.process);
    }
    /**
     * Change the user's MobileCoin address, can also be an empty string
     * @param address - The new MobileCoin address to use
     */
    async setMobileCoinAddress(address) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateProfile", {
            mobileCoinAddress: address ?? ""
        }, this.client.process);
    }
    /**
     * Change the status message for this user, can also be an empty string
     * @param message - The status message to use
     * @param emoji - The status emoji to use
     */
    async setStatus(message, emoji) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateProfile", {
            about: message ?? "", aboutEmoji: emoji ?? ""
        }, this.client.process);
    }
    /**
     * Change the avatar used by this user
     * @param url - Either an {@link AttachmentBuilder}, or a path/data URI to a file
     */
    async setAvatar(url) {
        await CLIDispatcher_1.CLIDispatcher.dispatch("updateProfile", {
            avatar: url instanceof AttachmentBuilder_1.AttachmentBuilder ? url.uri : url
        }, this.client.process);
    }
}
exports.ClientUser = ClientUser;
//# sourceMappingURL=ClientUser.js.map