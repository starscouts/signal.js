import { Client } from "./Client";
import { DM } from "./DM";
import { Group } from "./Group";
import { SentMessage } from "./SentMessage";
import { Sticker } from "./Sticker";
/**
 * A sticker as sent to Signal
 */
export declare class SentStickerMessage extends SentMessage {
    /**
     * {@link Sticker} that was sent
     */
    sticker: Sticker;
    /**
     * @param time - The timestamp at which the sticker was sent
     * @param channel - The channel the sticker was sent at
     * @param client
     * @param sticker - The sticker that was sent
     * @internal
     */
    constructor(time: number, channel: DM | Group, client: Client, sticker: Sticker);
    /**
     * Delete the sticker message
     */
    delete(): Promise<void>;
}
