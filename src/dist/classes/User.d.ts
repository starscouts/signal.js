import { UserDataType } from "../enums/UserDataType";
import { Client } from "./Client";
import { DM } from "./DM";
/**
 * A Signal user
 */
export declare class User {
    /**
     * The user's phone number
     */
    number?: string;
    /**
     * The user's nickname they set
     */
    nickName?: string;
    /**
     * The user's UUID
     */
    uuid?: string;
    /**
     * The ID of the device the user is on
     */
    device?: number;
    private client;
    /**
     * @param data - Sufficient data to create a {@link User}
     * @param dataType - The type of data used to create the {@link User}
     * @param client
     * @internal
     */
    constructor(data: any, dataType: UserDataType, client: Client);
    /**
     * Create a new {@link User} from a phone number
     * @param number - The phone number to use
     * @param client
     */
    static fromNumber(number: string, client: Client): User;
    /**
     * Create a {@link DM} with this user
     */
    createDM(): DM;
    /**
     * Block or unblock this user
     * @param blocked - Whether the user should be blocked or not
     */
    setBlocked(blocked: boolean): Promise<void>;
    /**
     * Verify the user's safety number
     *
     * @param safetyNumber - The user's safety number.
     * If not present, all known keys will be trusted
     */
    verify(safetyNumber?: string): Promise<void>;
    /**
     * Add the user to the contacts list
     * @param name - The name to give the user
     */
    addToContacts(name?: string): Promise<void>;
    /**
     * Remove the user from the contact list
     */
    removeFromContacts(): Promise<void>;
    /**
     * Change the disappearing messages expiration time
     * @param time - The time (in seconds) before a message gets deleted.
     * Use 0 to disable disappearing messages
     */
    setDisappearingMessagesTime(time?: number): Promise<void>;
}
