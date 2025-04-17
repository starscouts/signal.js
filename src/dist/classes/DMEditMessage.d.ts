import { User } from "./User";
import { Client } from "./Client";
import { DMDataMessage } from "./DMDataMessage";
import { EditMessage } from "./EditMessage";
/**
 * An edit message sent in a {@link DM}
 */
export declare class DMEditMessage extends DMDataMessage implements EditMessage {
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
    constructor(user: User, data: any, time: number, originalTime: number, client: Client);
}
