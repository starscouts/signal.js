import {Client} from "./Client";
import {DM} from "./DM";
import {Group} from "./Group";

/**
 * A message sent to Signal by this client
 */
export class SentMessage {
    public client: Client;

    /**
     * {@link Date} at which the message was created
     */
    public createdAt: Date;

    /**
     * Timestamp at which the message was created
     */
    public createdTimestamp: number;

    /**
     * Channel in which the message was created
     */
    public channel: DM | Group;

    /**
     * @param time - The timestamp at which the sticker was sent
     * @param channel - The channel the sticker was sent at
     * @param client
     * @internal
     */
    constructor(time: number, channel: DM | Group, client: Client) {
        this.client = client;
        this.channel = channel;
        this.createdAt = new Date(time);
        this.createdTimestamp = time;
    }
}