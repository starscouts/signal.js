"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attachment = void 0;
const AttachmentSize_1 = require("./AttachmentSize");
/**
 * An attachment added to a message
 */
class Attachment {
    /**
     * @param attachmentData - Data to use to construct the attachment
     * @internal
     */
    constructor(attachmentData) {
        this.type = attachmentData.contentType;
        this.fileName = attachmentData.filename;
        this.fileId = attachmentData.id;
        this.size = new AttachmentSize_1.AttachmentSize(attachmentData.size);
        this.width = attachmentData.width;
        this.height = attachmentData.height;
        this.caption = attachmentData.caption;
    }
}
exports.Attachment = Attachment;
//# sourceMappingURL=Attachment.js.map