"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMStickerMessage = void 0;
const DMMessage_1 = require("./DMMessage");
const DM_1 = require("./DM");
const Sticker_1 = require("./Sticker");
const StickerSource_1 = require("../enums/StickerSource");
/**
 * A sticker message sent in a {@link DM}
 */
class DMStickerMessage extends DMMessage_1.DMMessage {
    /**
     * @param user - The author of the message
     * @param data - Data associated with the sticker
     * @param time - The timestamp the message was sent at
     * @param client
     * @internal
     */
    constructor(user, data, time, client) {
        super(user, time, new DM_1.DM(user.uuid, user.number, client), client, data.expiresInSeconds);
        this.sticker = new Sticker_1.Sticker(StickerSource_1.StickerSource.Received, data.sticker, client);
    }
}
exports.DMStickerMessage = DMStickerMessage;
//# sourceMappingURL=DMStickerMessage.js.map