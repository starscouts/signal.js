import {User} from "./User";
import {DMMessage} from "./DMMessage";
import {DM} from "./DM";
import {Client} from "./Client";
import {DeleteMessage} from "./DeleteMessage";

/**
 * A deletion message sent in a {@link DM}
 */
export class DMDeleteMessage extends DMMessage implements DeleteMessage {
    /**
     * {@link Date} at which the original message was created
     */
    public originalCreatedAt: Date;

    /**
     * Timestamp at which the original message was created
     */
    public originalCreatedTimestamp: number;

    /**
     * @param user - The author of the message
     * @param data - Data associated with the message
     * @param time - The timestamp the message was sent at
     * @param originalTime - The timestamp the original message was sent at
     * @param client
     * @internal
     */
    constructor(user: User, data: any, time: number, client: Client, originalTime: number) {
        super(user, time, new DM(user.uuid, user.number, client), client, data.expiresInSeconds);
        this.originalCreatedAt = new Date(originalTime);
        this.originalCreatedTimestamp = originalTime;
    }
}