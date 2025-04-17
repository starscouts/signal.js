import { Client } from "./Client";
import { DM } from "./DM";
import { Group } from "./Group";
import { IChatMessageOptions } from "../types/IChatMessageOptions";
import { SentMessage } from "./SentMessage";
/**
 * A text message sent to Signal
 */
export declare class SentDataMessage extends SentMessage {
    /**
     * Text of the message
     */
    content: string;
    /**
     * Options used to build the message
     */
    options?: IChatMessageOptions;
    /**
     * @param time - The timestamp at which the message was sent
     * @param channel - The channel the message was sent in
     * @param client
     * @param content - The text of the message
     * @param options - The options used to build the message
     * @internal
     */
    constructor(time: number, channel: DM | Group, client: Client, content: string, options?: IChatMessageOptions);
    /**
     * Edit the message
     * @param text - The new text of the message
     * @param options - The new options used to build the message
     */
    edit(text: string, options?: IChatMessageOptions): Promise<SentDataMessage>;
    /**
     * Delete the message
     */
    delete(): Promise<void>;
}
