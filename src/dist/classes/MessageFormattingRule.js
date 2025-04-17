"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFormattingRule = void 0;
/**
 * A rule used to apply formatting styles to a message
 */
class MessageFormattingRule {
    /**
     * @param data - Data to reconstruct the formatting rule
     * @param text - Non-formatted message text
     * @internal
     */
    constructor(data, text) {
        this.styling = data.style;
        this.start = data.start;
        this.length = data.length;
        this.end = data.start + data.length;
        this.extract = text?.substring(this.start, this.end);
    }
    /**
     * Build a formatting rule
     * @param style - The style to apply
     * @param start - The start position
     * @param length - The length of the rule
     */
    static build(style, start, length) {
        return new MessageFormattingRule({
            style, start, length
        });
    }
    /**
     * Convert the formatting rule to a format that can be passed to signal-cli
     */
    toCLIFormat() {
        return this.start + ":" + this.length + ":" + this.styling;
    }
}
exports.MessageFormattingRule = MessageFormattingRule;
//# sourceMappingURL=MessageFormattingRule.js.map