"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupStickerMessage = void 0;
const GroupMessage_1 = require("./GroupMessage");
const Group_1 = require("./Group");
const Sticker_1 = require("./Sticker");
const StickerSource_1 = require("../enums/StickerSource");
/**
 * A sticker message sent in a {@link Group}
 */
class GroupStickerMessage extends GroupMessage_1.GroupMessage {
    /**
     * @param user - The author of the message
     * @param data - Data associated with the sticker
     * @param time - The timestamp the message was sent at
     * @param groupId - The group the message was sent in
     * @param client
     * @internal
     */
    constructor(user, data, time, groupId, client) {
        super(user, time, new Group_1.Group(groupId, client), client, data.expiresInSeconds);
        this.sticker = new Sticker_1.Sticker(StickerSource_1.StickerSource.Received, data.sticker, client);
    }
}
exports.GroupStickerMessage = GroupStickerMessage;
//# sourceMappingURL=GroupStickerMessage.js.map