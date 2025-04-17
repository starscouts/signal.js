import { User } from "./User";
import { DMMessage } from "./DMMessage";
import { Client } from "./Client";
import { DeleteMessage } from "./DeleteMessage";
/**
 * A deletion message sent in a {@link DM}
 */
export declare class DMDeleteMessage extends DMMessage implements DeleteMessage {
    /**
     * {@link Date} at which the original message was created
     */
    originalCreatedAt: Date;
    /**
     * Timestamp at which the original message was created
     */
    originalCreatedTimestamp: number;
    /**
     * @param user - The author of the message
     * @param data - Data associated with the message
     * @param time - The timestamp the message was sent at
     * @param originalTime - The timestamp the original message was sent at
     * @param client
     * @internal
     */
    constructor(user: User, data: any, time: number, client: Client, originalTime: number);
}
