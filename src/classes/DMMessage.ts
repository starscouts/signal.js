import {ReceivedMessage} from "./ReceivedMessage";
import {User} from "./User";
import {DM} from "./DM";
import {Client} from "./Client";

/**
 * A message sent in a {@link DM}
 */
export class DMMessage extends ReceivedMessage {
    /**
     * {@link DM} the message was sent to
     */
    public channel: DM;

    /**
     * Whether the message was sent in a group channel or not
     */
    public isGroup: boolean = false;

    /**
     * @param user - The author of the message
     * @param time - The timestamp the message was sent at
     * @param dm - The DM the message was sent in
     * @param client
     * @param expirity - The number of seconds remaining before the message disappears, if applicable
     * @internal
     */
    constructor(user: User, time: number, dm: DM, client: Client, expirity?: number) {
        super(user, time, dm, client, expirity);
    }
}