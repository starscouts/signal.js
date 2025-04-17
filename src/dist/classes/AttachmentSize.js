"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentSize = void 0;
/**
 * A size to associate with an Attachment
 */
class AttachmentSize extends Number {
    /**
     * @internal
     * @param props
     */
    constructor(props) {
        super(props);
    }
    /**
     * Convert the size from bytes to bits
     */
    toBits() {
        return parseInt(this.toString()) * 8;
    }
}
exports.AttachmentSize = AttachmentSize;
//# sourceMappingURL=AttachmentSize.js.map