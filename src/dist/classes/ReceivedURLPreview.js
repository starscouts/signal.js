"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceivedURLPreview = void 0;
const Attachment_1 = require("./Attachment");
/**
 * A URL preview in a received message
 */
class ReceivedURLPreview {
    /**
     * @param data - Data to reconstruct the {@link ReceivedURLPreview}
     * @internal
     */
    constructor(data) {
        this.url = data.url;
        this.title = data.title;
        if (data.description)
            this.description = data.description;
        if (data.image)
            this.image = new Attachment_1.Attachment(data.image);
    }
    /**
     * Build a URL preview object
     */
    build() {
        return {
            url: this.url, title: this.title, description: this.description, image: this.image
        };
    }
}
exports.ReceivedURLPreview = ReceivedURLPreview;
//# sourceMappingURL=ReceivedURLPreview.js.map