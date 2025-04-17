"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteMessage = void 0;
const User_1 = require("./User");
const Attachment_1 = require("./Attachment");
const UserDataType_1 = require("../enums/UserDataType");
/**
 * A message constructed from a quote
 */
class QuoteMessage {
    /**
     * @param quoteData - Data to reconstruct the quoted message
     * @param client
     * @internal
     */
    constructor(quoteData, client) {
        this.author = new User_1.User(quoteData, UserDataType_1.UserDataType.Quote, client);
        this.content = quoteData.text && quoteData.text.trim().length > 0 ? quoteData.text : null;
        this.attachments = quoteData.attachments?.map(i => new Attachment_1.Attachment(i));
        this.createdTimestamp = quoteData.id;
        this.createdAt = new Date(quoteData.id);
    }
}
exports.QuoteMessage = QuoteMessage;
//# sourceMappingURL=QuoteMessage.js.map