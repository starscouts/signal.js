"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickerSource = void 0;
/**
 * The source a sticker comes from
 */
var StickerSource;
(function (StickerSource) {
    /**
     * The sticker was received in a message
     */
    StickerSource[StickerSource["Received"] = 0] = "Received";
    /**
     * The sticker is part of a sticker pack
     */
    StickerSource[StickerSource["Pack"] = 1] = "Pack";
})(StickerSource || (exports.StickerSource = StickerSource = {}));
//# sourceMappingURL=StickerSource.js.map