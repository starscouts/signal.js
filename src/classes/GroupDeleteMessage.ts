import {User} from "./User";
import {Client} from "./Client";
import {DeleteMessage} from "./DeleteMessage";
import {GroupMessage} from "./GroupMessage";
import {Group} from "./Group";

/**
 * A deletion message sent in a {@link Group}
 */
export class GroupDeleteMessage extends GroupMessage implements DeleteMessage {
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
    constructor(user: User, data: any, time: number, groupId: string, client: Client, originalTime: number) {
        super(user, time, new Group(groupId, client), client, data.expiresInSeconds);
        this.originalCreatedAt = new Date(originalTime);
        this.originalCreatedTimestamp = originalTime;
    }
}