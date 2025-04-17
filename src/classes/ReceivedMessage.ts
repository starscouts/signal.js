import {User} from "./User";
import {Group} from "./Group";
import {DM} from "./DM";
import {Client} from "./Client";

/**
 * A message received from Signal
 * @internal
 */
export class ReceivedMessage {
    public client: Client;

    /**
     * Author of the message
     */
    public author: User;

    /**
     * {@link Date} the message was sent at
     */
    public createdAt: Date;

    /**
     * Timestamp the message was sent at
     */
    public createdTimestamp: number;

    /**
     * Channel the message was sent in
     */
    public channel: DM | Group;

    /**
     * Whether the message will disappear automatically or not (disappearing messages)
     */
    public ephemeral: boolean | null = false;

    /**
     * {@link Date} at which the message will disappear, if applicable
     */
    public expiresAt?: Date;

    /**
     * Timestamp at which the message will disappear, if applicable
     */
    public expiresTimestamp?: number;

    /**
     * Number of seconds remaining before the message disappears, if applicable
     */
    public expiresInSeconds?: number;

    /**
     * Whether the message was sent in a group channel or not
     */
    public isGroup: boolean;

    /**
     * @param user - The author of the message
     * @param time - The timestamp the message was sent at
     * @param channel - The channel the message was sent it
     * @param client
     * @param expirity - The number of seconds remaining before the message disappears, if applicable
     * @internal
     */
    constructor(user: User, time: number, channel: DM | Group, client: Client, expirity?: number | null) {
        this.client = client;
        this.channel = channel;
        this.author = user;
        this.createdAt = new Date(time);
        this.createdTimestamp = time;

        if (expirity && expirity > 0) {
            this.ephemeral = true;
            this.expiresInSeconds = expirity;
            this.expiresTimestamp = new Date().getTime() + (expirity * 1000);
            this.expiresAt = new Date(new Date().getTime() + (expirity * 1000));
        } else if (expirity === null) {
            this.ephemeral = null;
        }
    }
}