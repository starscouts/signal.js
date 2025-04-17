import { Client } from "./Client";
import { Emoji } from "./Emoji";
import { AttachmentBuilder } from "./AttachmentBuilder";
import { IFilePath } from "../types/IFilePath";
import { IDataURI } from "../types/IDataURI";
/**
 * A Signal user to associate with a {@link Client}
 */
export declare class ClientUser {
    client: any;
    /**
     * @internal
     * @param client
     */
    constructor(client: Client);
    /**
     * Remove the currently set username
     */
    deleteUserName(): Promise<void>;
    /**
     * Change the username used by this account
     * @param userName - The new username to use
     */
    setUserName(userName: string): Promise<void>;
    /**
     * Change the user's first name, cannot be empty
     * @param name - The new first name to use
     */
    setFirstName(name: string): Promise<void>;
    /**
     * Change the user's last name, can also be an empty string
     * @param name - The new last name to use
     */
    setLastName(name: string): Promise<void>;
    /**
     * Change the user's MobileCoin address, can also be an empty string
     * @param address - The new MobileCoin address to use
     */
    setMobileCoinAddress(address?: string): Promise<void>;
    /**
     * Change the status message for this user, can also be an empty string
     * @param message - The status message to use
     * @param emoji - The status emoji to use
     */
    setStatus(message?: string, emoji?: Emoji): Promise<void>;
    /**
     * Change the avatar used by this user
     * @param url - Either an {@link AttachmentBuilder}, or a path/data URI to a file
     */
    setAvatar(url: AttachmentBuilder | IFilePath | IDataURI): Promise<void>;
}
