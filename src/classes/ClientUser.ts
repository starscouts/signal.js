import {Client} from "./Client";
import {CLIDispatcher} from "./CLIDispatcher";
import {Emoji} from "./Emoji";
import {AttachmentBuilder} from "./AttachmentBuilder";
import {IFilePath} from "../types/IFilePath";
import {IDataURI} from "../types/IDataURI";

/**
 * A Signal user to associate with a {@link Client}
 */
export class ClientUser {
    public client;

    /**
     * @internal
     * @param client
     */
    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Remove the currently set username
     */
    public async deleteUserName() {
        await CLIDispatcher.dispatch("updateAccount", {
            deleteUsername: true
        }, this.client.process);
    }

    /**
     * Change the username used by this account
     * @param userName - The new username to use
     */
    public async setUserName(userName: string) {
        await CLIDispatcher.dispatch("updateAccount", {
            username: userName
        }, this.client.process);
    }

    /**
     * Change the user's first name, cannot be empty
     * @param name - The new first name to use
     */
    public async setFirstName(name: string) {
        await CLIDispatcher.dispatch("updateProfile", {
            givenName: name
        }, this.client.process);
    }

    /**
     * Change the user's last name, can also be an empty string
     * @param name - The new last name to use
     */
    public async setLastName(name: string) {
        await CLIDispatcher.dispatch("updateProfile", {
            familyName: name
        }, this.client.process);
    }

    /**
     * Change the user's MobileCoin address, can also be an empty string
     * @param address - The new MobileCoin address to use
     */
    public async setMobileCoinAddress(address?: string) {
        await CLIDispatcher.dispatch("updateProfile", {
            mobileCoinAddress: address ?? ""
        }, this.client.process);
    }

    /**
     * Change the status message for this user, can also be an empty string
     * @param message - The status message to use
     * @param emoji - The status emoji to use
     */
    public async setStatus(message?: string, emoji?: Emoji) {
        await CLIDispatcher.dispatch("updateProfile", {
            about: message ?? "", aboutEmoji: emoji ?? ""
        }, this.client.process);
    }

    /**
     * Change the avatar used by this user
     * @param url - Either an {@link AttachmentBuilder}, or a path/data URI to a file
     */
    public async setAvatar(url: AttachmentBuilder | IFilePath | IDataURI) {
        await CLIDispatcher.dispatch("updateProfile", {
            avatar: url instanceof AttachmentBuilder ? url.uri : url
        }, this.client.process);
    }
}