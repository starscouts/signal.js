"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickerPack = void 0;
const Sticker_1 = require("./Sticker");
const StickerSource_1 = require("../enums/StickerSource");
/**
 * A Signal sticker pack
 */
class StickerPack {
    /**
     * @param data - The sticker pack's ID or data
     * @param client
     * @internal
     */
    constructor(data, client) {
        let cacheData;
        if (typeof data === "string") {
            cacheData = client.stickerPacks['list'].filter(i => i.packId === data)[0];
        }
        else {
            cacheData = data;
        }
        this.id = cacheData.packId;
        this.title = cacheData.title;
        this.author = cacheData.author;
        this.url = cacheData.url;
        this.cover = new Sticker_1.Sticker(StickerSource_1.StickerSource.Pack, cacheData.cover, client, this);
        this.items = cacheData.stickers.map(i => {
            return new Sticker_1.Sticker(StickerSource_1.StickerSource.Pack, i, client, this);
        });
        if (typeof cacheData.installed === "boolean")
            this.installed = cacheData.installed;
    }
}
exports.StickerPack = StickerPack;
//# sourceMappingURL=StickerPack.js.map