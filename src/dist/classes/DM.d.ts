import { Channel } from "./Channel";
import { Client } from "./Client";
import { IChatMessageOptions } from "../types/IChatMessageOptions";
import { SentDataMessage } from "./SentDataMessage";
import { Sticker } from "./Sticker";
/**
 * A Signal 1-to-1 chat
 */
export declare class DM extends Channel {
    /**
     * Whether the channel is a group chat
     */
    group: boolean;
    /**
     * Recipient's phone number
     */
    number: string;
    private client;
    /**
     * @param userId - The ID of the user
     * @param number - The user's phone number
     * @param client
     * @internal
     */
    constructor(userId: string | null, number: string, client: Client);
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
    /**
     * Send a sticker to this channel
     * @param sticker - The sticker to send
     */
    sendSticker(sticker: Sticker): Promise<void>;
}
