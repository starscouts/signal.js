import { Client } from "./Client";
import { DM } from "./DM";
import { Group } from "./Group";
/**
 * A message sent to Signal by this client
 */
export declare class SentMessage {
    client: Client;
    /**
     * {@link Date} at which the message was created
     */
    createdAt: Date;
    /**
     * Timestamp at which the message was created
     */
    createdTimestamp: number;
    /**
     * Channel in which the message was created
     */
    channel: DM | Group;
    /**
     * @param time - The timestamp at which the sticker was sent
     * @param channel - The channel the sticker was sent at
     * @param client
     * @internal
     */
    constructor(time: number, channel: DM | Group, client: Client);
}
