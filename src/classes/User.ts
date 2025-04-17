import {UserDataType} from "../enums/UserDataType";
import {CLIDispatcher} from "./CLIDispatcher";
import {Client} from "./Client";
import {DM} from "./DM";

/**
 * A Signal user
 */
export class User {
    /**
     * The user's phone number
     */
    public number?: string = null;

    /**
     * The user's nickname they set
     */
    public nickName?: string = null;

    /**
     * The user's UUID
     */
    public uuid?: string = null;

    /**
     * The ID of the device the user is on
     */
    public device?: number = null;
    private client: Client;

    /**
     * @param data - Sufficient data to create a {@link User}
     * @param dataType - The type of data used to create the {@link User}
     * @param client
     * @internal
     */
    constructor(data: any, dataType: UserDataType, client: Client) {
        this.client = client;

        if (dataType === UserDataType.Envelope) {
            if (data.sourceNumber && typeof data.sourceNumber === "string") this.number = data.sourceNumber;
            if (data.sourceName && typeof data.sourceName === "string") this.nickName = data.sourceName;
            if (data.sourceUuid && typeof data.sourceUuid === "string") this.uuid = data.sourceUuid;
            if (data.sourceDevice && typeof data.sourceDevice === "number") this.device = data.sourceDevice;
        } else if (dataType === UserDataType.Quote) {
            if (data.authorNumber && typeof data.authorNumber === "string") this.number = data.authorNumber;
            if (data.authorUuid && typeof data.authorUuid === "string") this.uuid = data.authorUuid;
        } else if (dataType === UserDataType.Reaction) {
            if (data.targetAuthorNumber && typeof data.targetAuthorNumber === "string") this.number = data.targetAuthorNumber;
            if (data.targetAuthorUuid && typeof data.targetAuthorUuid === "string") this.uuid = data.targetAuthorUuid;
        } else if (dataType === UserDataType.MentionOrGroup || dataType === UserDataType.ProfileOrIdentity) {
            if (data.number && typeof data.number === "string") this.number = data.number;
            if (data.uuid && typeof data.uuid === "string") this.uuid = data.uuid;
            if (data.name && typeof data.name === "string") this.nickName = data.name;
        } else if (dataType === UserDataType.Number) {
            if (data && typeof data === "string") this.number = data;
        }
    }

    /**
     * Create a new {@link User} from a phone number
     * @param number - The phone number to use
     * @param client
     */
    public static fromNumber(number: string, client: Client) {
        return new User(number, UserDataType.Number, client);
    }

    /**
     * Create a {@link DM} with this user
     */
    public createDM() {
        return new DM(this.uuid ?? null, this.number, this.client);
    }

    /**
     * Block or unblock this user
     * @param blocked - Whether the user should be blocked or not
     */
    public async setBlocked(blocked: boolean) {
        if (blocked) {
            await CLIDispatcher.dispatch("block", {
                recipient: [this.number]
            }, this.client.process);
        } else {
            await CLIDispatcher.dispatch("unblock", {
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
    public async verify(safetyNumber?: string) {
        if (safetyNumber) {
            await CLIDispatcher.dispatch("trust", {
                verifiedSafetyNumber: safetyNumber.replaceAll(" ", "").replaceAll("\r\n", "").replaceAll("\n", ""),
                recipient: [this.number]
            }, this.client.process);
        } else {
            await CLIDispatcher.dispatch("trust", {
                trustAllKnownKeys: true, recipient: [this.number]
            }, this.client.process);
        }
    }

    /**
     * Add the user to the contacts list
     * @param name - The name to give the user
     */
    public async addToContacts(name?: string) {
        await CLIDispatcher.dispatch("updateContact", {
            name: name, recipient: [this.number]
        }, this.client.process);

        await CLIDispatcher.dispatch("sendContacts", {}, this.client.process);
    }

    /**
     * Remove the user from the contact list
     */
    public async removeFromContacts() {
        await CLIDispatcher.dispatch("removeContact", {
            recipient: [this.number]
        }, this.client.process);

        await CLIDispatcher.dispatch("sendContacts", {}, this.client.process);
    }

    /**
     * Change the disappearing messages expiration time
     * @param time - The time (in seconds) before a message gets deleted.
     * Use 0 to disable disappearing messages
     */
    public async setDisappearingMessagesTime(time?: number) {
        await CLIDispatcher.dispatch("updateContact", {
            expiration: time ?? 0, recipient: [this.number]
        }, this.client.process);

        await CLIDispatcher.dispatch("sendContacts", {}, this.client.process);
    }
}