import {IChatMessageOptions} from "../types/IChatMessageOptions";
import {SentDataMessage} from "./SentDataMessage";

/**
 * A channel (either DM or group) on Signal
 */
export class Channel {
    /**
     * Whether the channel is a group chat
     */
    public group: boolean;

    /**
     * Channel (DM or group) ID
     */
    public id: string;

    /**
     * @internal
     */
    constructor() {
    }

    /**
     * Send a message to the channel
     * @param text - The text of the message, or an empty string
     * @param options - The optional options used to build the message
     */
    // @ts-ignore
    public async send(text: string, options?: IChatMessageOptions): Promise<SentDataMessage> {
    }

    /**
     * Set the client's typing status for this channel
     * @param typing - Whether the client should be typing or not
     */
    public async setTyping(typing: boolean): Promise<void> {
    }
}