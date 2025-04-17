import {User} from "./User";
import {Client} from "./Client";
import {EditMessage} from "./EditMessage";
import {GroupDataMessage} from "./GroupDataMessage";

/**
 * An edit message sent in a {@link Group}
 */
export class GroupEditMessage extends GroupDataMessage implements EditMessage {
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
     * @param groupId - The group the message was sent in
     * @param originalTime - The timestamp the original message was sent at
     * @param client
     * @internal
     */
    constructor(user: User, data: any, time: number, groupId: string, originalTime: number, client: Client) {
        super(user, data, time, groupId, client);
        this.originalCreatedAt = new Date(originalTime);
        this.originalCreatedTimestamp = originalTime;
    }
}
