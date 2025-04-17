"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sticker = void 0;
const StickerPack_1 = require("./StickerPack");
const Emoji_1 = require("./Emoji");
const StickerSource_1 = require("../enums/StickerSource");
/**
 * A Signal sticker
 */
class Sticker {
    /**
     * @param source - The source of this sticker
     * @param data - Data representing the sticker
     * @param client
     * @param pack - The pack the sticker is part of
     * @internal
     */
    constructor(source, data, client, pack) {
        if (source === StickerSource_1.StickerSource.Received) {
            this.pack = new StickerPack_1.StickerPack(data.packId, client);
            this.id = data.stickerId;
        }
        else if (source === StickerSource_1.StickerSource.Pack) {
            this.pack = pack;
            this.id = data.id;
            this.emoji = new Emoji_1.Emoji(data.emoji);
        }
    }
}
exports.Sticker = Sticker;
//# sourceMappingURL=Sticker.js.map