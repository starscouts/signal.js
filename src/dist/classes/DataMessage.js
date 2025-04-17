"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataMessage = void 0;
/**
 * A data (text) message sent on Signal
 * @internal
 */
class DataMessage {
    constructor() {
        /**
         * {@link Attachment}s associated with the message
         */
        this.attachments = [];
        /**
         * Mentions in the message
         */
        this.mentions = [];
        /**
         * URL previews present in the message
         */
        this.previews = [];
    }
}
exports.DataMessage = DataMessage;
//# sourceMappingURL=DataMessage.js.map