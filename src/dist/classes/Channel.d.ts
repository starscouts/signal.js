import { IChatMessageOptions } from "../types/IChatMessageOptions";
import { SentDataMessage } from "./SentDataMessage";
/**
 * A channel (either DM or group) on Signal
 */
export declare class Channel {
    /**
     * Whether the channel is a group chat
     */
    group: boolean;
    /**
     * Channel (DM or group) ID
     */
    id: string;
    /**
     * @internal
     */
    constructor();
    /**
     * Send a message to the channel
     * @param text - The text of the message, or an empty string
     * @param options - The optional options used to build the message
     */
    send(text: string, options?: IChatMessageOptions): Promise<SentDataMessage>;
    /**
     * Set the client's typing status for this channel
     * @param typing - Whether the client should be typing or not
     */
    setTyping(typing: boolean): Promise<void>;
}
