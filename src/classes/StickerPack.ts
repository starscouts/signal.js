import {Client} from "./Client";
import {Sticker} from "./Sticker";
import {StickerSource} from "../enums/StickerSource";

/**
 * A Signal sticker pack
 */
export class StickerPack {
    /**
     * Sticker pack ID
     */
    public id: string;

    /**
     * Sticker pack name
     */
    public title: string;

    /**
     * Sticker pack author
     */
    public author: string;

    /**
     * URL to install the sticker pack
     */
    public url: string;

    /**
     * Sticker used as a cover for this pack
     */
    public cover: Sticker;

    /**
     * Stickers the pack contents
     */
    public items: Sticker[];

    /**
     * Whether the sticker pack is installed or not
     */
    public installed?: boolean;

    /**
     * @param data - The sticker pack's ID or data
     * @param client
     * @internal
     */
    constructor(data: string | any, client: Client) {
        let cacheData;

        if (typeof data === "string") {
            cacheData = client.stickerPacks['list'].filter(i => i.packId === data)[0];
        } else {
            cacheData = data;
        }

        this.id = cacheData.packId;
        this.title = cacheData.title;
        this.author = cacheData.author;
        this.url = cacheData.url;
        this.cover = new Sticker(StickerSource.Pack, cacheData.cover, client, this);
        this.items = cacheData.stickers.map(i => {
            return new Sticker(StickerSource.Pack, i, client, this);
        });
        if (typeof cacheData.installed === "boolean") this.installed = cacheData.installed;
    }
}