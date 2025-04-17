import {User} from "./User";
import {DMMessage} from "./DMMessage";
import {DM} from "./DM";
import {Client} from "./Client";
import {Sticker} from "./Sticker";
import {StickerSource} from "../enums/StickerSource";
import {StickerMessage} from "./StickerMessage";

/**
 * A sticker message sent in a {@link DM}
 */
export class DMStickerMessage extends DMMessage implements StickerMessage {
    /**
     * Sticker that was sent
     */
    public sticker: Sticker;

    /**
     * @param user - The author of the message
     * @param data - Data associated with the sticker
     * @param time - The timestamp the message was sent at
     * @param client
     * @internal
     */
    constructor(user: User, data: any, time: number, client: Client) {
        super(user, time, new DM(user.uuid, user.number, client), client, data.expiresInSeconds);
        this.sticker = new Sticker(StickerSource.Received, data.sticker, client);
    }
}