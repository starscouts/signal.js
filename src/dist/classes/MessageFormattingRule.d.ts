import { MessageFormattingStyle } from "../enums/MessageFormattingStyle";
/**
 * A rule used to apply formatting styles to a message
 */
export declare class MessageFormattingRule {
    /**
     * Starting position of the rule
     */
    start: number;
    /**
     * Ending position of the rule
     */
    end: number;
    /**
     * Length of the rule
     */
    length: number;
    /**
     * Chunk of text covered by this rule
     */
    extract?: string;
    /**
     * Style the rule has to apply
     */
    styling: MessageFormattingStyle;
    /**
     * @param data - Data to reconstruct the formatting rule
     * @param text - Non-formatted message text
     * @internal
     */
    constructor(data: any, text?: string);
    /**
     * Build a formatting rule
     * @param style - The style to apply
     * @param start - The start position
     * @param length - The length of the rule
     */
    static build(style: MessageFormattingStyle, start: number, length: number): MessageFormattingRule;
    /**
     * Convert the formatting rule to a format that can be passed to signal-cli
     */
    toCLIFormat(): string;
}
