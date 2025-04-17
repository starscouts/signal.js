import { User } from "./User";
import { Group } from "./Group";
import { DM } from "./DM";
import { Client } from "./Client";
/**
 * A message received from Signal
 * @internal
 */
export declare class ReceivedMessage {
    client: Client;
    /**
     * Author of the message
     */
    author: User;
    /**
     * {@link Date} the message was sent at
     */
    createdAt: Date;
    /**
     * Timestamp the message was sent at
     */
    createdTimestamp: number;
    /**
     * Channel the message was sent in
     */
    channel: DM | Group;
    /**
     * Whether the message will disappear automatically or not (disappearing messages)
     */
    ephemeral: boolean | null;
    /**
     * {@link Date} at which the message will disappear, if applicable
     */
    expiresAt?: Date;
    /**
     * Timestamp at which the message will disappear, if applicable
     */
    expiresTimestamp?: number;
    /**
     * Number of seconds remaining before the message disappears, if applicable
     */
    expiresInSeconds?: number;
    /**
     * Whether the message was sent in a group channel or not
     */
    isGroup: boolean;
    /**
     * @param user - The author of the message
     * @param time - The timestamp the message was sent at
     * @param channel - The channel the message was sent it
     * @param client
     * @param expirity - The number of seconds remaining before the message disappears, if applicable
     * @internal
     */
    constructor(user: User, time: number, channel: DM | Group, client: Client, expirity?: number | null);
}
