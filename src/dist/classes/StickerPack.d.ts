import { Client } from "./Client";
import { Sticker } from "./Sticker";
/**
 * A Signal sticker pack
 */
export declare class StickerPack {
    /**
     * Sticker pack ID
     */
    id: string;
    /**
     * Sticker pack name
     */
    title: string;
    /**
     * Sticker pack author
     */
    author: string;
    /**
     * URL to install the sticker pack
     */
    url: string;
    /**
     * Sticker used as a cover for this pack
     */
    cover: Sticker;
    /**
     * Stickers the pack contents
     */
    items: Sticker[];
    /**
     * Whether the sticker pack is installed or not
     */
    installed?: boolean;
    /**
     * @param data - The sticker pack's ID or data
     * @param client
     * @internal
     */
    constructor(data: string | any, client: Client);
}
