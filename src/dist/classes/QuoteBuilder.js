"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteBuilder = void 0;
const QuoteMessage_1 = require("./QuoteMessage");
/**
 * A helper class to build a quote to send
 */
class QuoteBuilder {
    /**
     * @param client
     * @param timestamp - The timestamp at which the quoted message was sent
     * @param number - The number of the author of the quoted message
     * @param text - The text of the quoted message
     */
    constructor(client, timestamp, number, text) {
        this.client = client;
        this.timestamp = timestamp;
        this.author = number;
        this.content = text;
    }
    /**
     * Transform the {@link QuoteBuilder} into a valid {@link QuoteMessage}
     */
    build() {
        return new QuoteMessage_1.QuoteMessage({
            authorNumber: this.author, id: this.timestamp, text: this.content
        }, this.client);
    }
}
exports.QuoteBuilder = QuoteBuilder;
//# sourceMappingURL=QuoteBuilder.js.map