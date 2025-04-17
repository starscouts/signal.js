import { StickerPack } from "./StickerPack";
import { Client } from "./Client";
import { Emoji } from "./Emoji";
import { StickerSource } from "../enums/StickerSource";
/**
 * A Signal sticker
 */
export declare class Sticker {
    /**
     * Pack this sticker is part of
     */
    pack: StickerPack;
    /**
     * ID to the sticker relative to the pack
     */
    id: number;
    /**
     * {@link Emoji} representing this sticker, if applicable
     */
    emoji?: Emoji;
    /**
     * @param source - The source of this sticker
     * @param data - Data representing the sticker
     * @param client
     * @param pack - The pack the sticker is part of
     * @internal
     */
    constructor(source: StickerSource, data: any, client: Client, pack?: StickerPack);
}
