import {ReceivedMessage} from "./ReceivedMessage";
import {User} from "./User";
import {Group} from "./Group";
import {Client} from "./Client";

/**
 * A message sent in a {@link Group}
 */
export class GroupMessage extends ReceivedMessage {
    /**
     * {@link Group} the message was sent to
     */
    public channel: Group;

    /**
     * Whether the message was sent in a group channel or not
     */
    public isGroup: boolean = true;

    /**
     * @param user - The author of the message
     * @param time - The timestamp the message was sent at
     * @param group - The group the message was sent in
     * @param client
     * @param expirity - The number of seconds remaining before the message disappears, if applicable
     * @internal
     */
    constructor(user: User, time: number, group: Group, client: Client, expirity?: number) {
        super(user, time, group, client, expirity);
    }
}