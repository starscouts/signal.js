import {MessageFormattingStyle} from "../enums/MessageFormattingStyle";

/**
 * A rule used to apply formatting styles to a message
 */
export class MessageFormattingRule {
    /**
     * Starting position of the rule
     */
    public start: number;

    /**
     * Ending position of the rule
     */
    public end: number;

    /**
     * Length of the rule
     */
    public length: number;

    /**
     * Chunk of text covered by this rule
     */
    public extract?: string;

    /**
     * Style the rule has to apply
     */
    public styling: MessageFormattingStyle;

    /**
     * @param data - Data to reconstruct the formatting rule
     * @param text - Non-formatted message text
     * @internal
     */
    constructor(data: any, text?: string) {
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
    public static build(style: MessageFormattingStyle, start: number, length: number) {
        return new MessageFormattingRule({
            style, start, length
        });
    }

    /**
     * Convert the formatting rule to a format that can be passed to signal-cli
     */
    public toCLIFormat(): string {
        return this.start + ":" + this.length + ":" + this.styling;
    }
}