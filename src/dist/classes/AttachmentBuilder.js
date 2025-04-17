"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentBuilder = void 0;
const fs_1 = require("fs");
/**
 * A helper to build an attachment to send to a message
 */
class AttachmentBuilder {
    /**
     * @param data - A file path, data URI, or object to construct an attachment
     */
    constructor(data) {
        if (typeof data === "string") {
            if (!data.startsWith("data:")) {
                (0, fs_1.lstatSync)(data);
            }
            this.uri = data;
        }
        else {
            let type = data.type ?? "application/octet-stream";
            if (data.fileName) {
                this.uri = `data:${type};filename=${data.fileName.replaceAll(";", "\\;")};base64,${data.data.toString("base64")}`;
            }
            else {
                this.uri = `data:${type};base64,${data.data.toString("base64")}`;
            }
        }
    }
}
exports.AttachmentBuilder = AttachmentBuilder;
//# sourceMappingURL=AttachmentBuilder.js.map