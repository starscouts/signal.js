import { MessageFormattingRule } from "./MessageFormattingRule";
/**
 * A collection of rules to apply formatting styles to a message
 */
export declare class MessageFormatting {
    /**
     * Array of {@link MessageFormattingRule}
     */
    rules: MessageFormattingRule[];
    /**
     * @param plain - Plain text message
     * @param data - List of Signal-formatted rules
     * @internal
     */
    constructor(plain?: string, data?: any);
    /**
     * Convert from a list of formatting rules
     * @param rules
     */
    static fromRules(rules: MessageFormattingRule[]): MessageFormatting;
    /**
     * Transform a Markdown-formatted text into a plain text string
     * that can be easily displayed.
     *
     * @param text - The text to use
     */
    static plainFromMarkdown(text: string): string;
    /**
     * Transform a Markdown-formatted text into a {@link MessageFormatting},
     * converting the compatible formatting options.
     *
     * @param text - The text to use
     * @experimental
     */
    static fromMarkdown(text: string): MessageFormatting;
}
