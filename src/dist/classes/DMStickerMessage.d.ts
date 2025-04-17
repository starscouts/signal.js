import { User } from "./User";
import { DMMessage } from "./DMMessage";
import { Client } from "./Client";
import { Sticker } from "./Sticker";
import { StickerMessage } from "./StickerMessage";
/**
 * A sticker message sent in a {@link DM}
 */
export declare class DMStickerMessage extends DMMessage implements StickerMessage {
    /**
     * Sticker that was sent
     */
    sticker: Sticker;
    /**
     * @param user - The author of the message
     * @param data - Data associated with the sticker
     * @param time - The timestamp the message was sent at
     * @param client
     * @internal
     */
    constructor(user: User, data: any, time: number, client: Client);
}
