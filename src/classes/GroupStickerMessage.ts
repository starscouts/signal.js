import {User} from "./User";
import {GroupMessage} from "./GroupMessage";
import {Group} from "./Group";
import {Client} from "./Client";
import {Sticker} from "./Sticker";
import {StickerSource} from "../enums/StickerSource";
import {StickerMessage} from "./StickerMessage";

/**
 * A sticker message sent in a {@link Group}
 */
export class GroupStickerMessage extends GroupMessage implements StickerMessage {
    /**
     * {@link Sticker} that was sent
     */
    public sticker: Sticker;

    /**
     * @param user - The author of the message
     * @param data - Data associated with the sticker
     * @param time - The timestamp the message was sent at
     * @param groupId - The group the message was sent in
     * @param client
     * @internal
     */
    constructor(user: User, data: any, time: number, groupId: string, client: Client) {
        super(user, time, new Group(groupId, client), client, data.expiresInSeconds);
        this.sticker = new Sticker(StickerSource.Received, data.sticker, client);
    }
}