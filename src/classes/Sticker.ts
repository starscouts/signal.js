import {StickerPack} from "./StickerPack";
import {Client} from "./Client";
import {Emoji} from "./Emoji";
import {StickerSource} from "../enums/StickerSource";

/**
 * A Signal sticker
 */
export class Sticker {
    /**
     * Pack this sticker is part of
     */
    public pack: StickerPack;

    /**
     * ID to the sticker relative to the pack
     */
    public id: number;

    /**
     * {@link Emoji} representing this sticker, if applicable
     */
    public emoji?: Emoji;

    /**
     * @param source - The source of this sticker
     * @param data - Data representing the sticker
     * @param client
     * @param pack - The pack the sticker is part of
     * @internal
     */
    constructor(source: StickerSource, data: any, client: Client, pack?: StickerPack) {
        if (source === StickerSource.Received) {
            this.pack = new StickerPack(data.packId, client);
            this.id = data.stickerId;
        } else if (source === StickerSource.Pack) {
            this.pack = pack;
            this.id = data.id;
            this.emoji = new Emoji(data.emoji);
        }
    }
}