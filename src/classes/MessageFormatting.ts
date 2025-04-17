import {MessageFormattingRule} from "./MessageFormattingRule";
import {marked} from "marked";

/**
 * A collection of rules to apply formatting styles to a message
 */
export class MessageFormatting {
    /**
     * Array of {@link MessageFormattingRule}
     */
    public rules: MessageFormattingRule[];

    /**
     * @param plain - Plain text message
     * @param data - List of Signal-formatted rules
     * @internal
     */
    constructor(plain?: string, data?: any) {
        if (data && plain) {
            this.rules = data.map(i => {
                return new MessageFormattingRule(i, plain);
            });
        } else {
            this.rules = [];
        }
    }

    /**
     * Convert from a list of formatting rules
     * @param rules
     */
    public static fromRules(rules: MessageFormattingRule[]): MessageFormatting {
        let mf = new MessageFormatting();

        for (let rule of rules) {
            mf.rules.push(rule);
        }

        return mf;
    }

    /**
     * Transform a Markdown-formatted text into a plain text string
     * that can be easily displayed.
     *
     * @param text - The text to use
     */
    public static plainFromMarkdown(text: string) {
        let renderer = {};
        text = text.replaceAll(/(?<!\n)<br>/gmi, "\n").replaceAll("<br>", "").replace(/(```)(.*)(\n)/gm, "$1$3").replace(/#+( |)(.*)/gm, "**$2**");

        renderer['strong'] = renderer['em'] = renderer['codespan'] = renderer['code'] = renderer['del'] = renderer['tablerow'] = renderer['tablecell'] = renderer['heading'] = renderer['blockquote'] = (text) => text;
        renderer['hr'] = () => "—————————";
        renderer['link'] = (href, title, text) => (title ?? text) + ": " + href;
        renderer['text'] = (text) => text.replace(/^( *)\* *(.*)/gm, "$1- $2");

        marked.use({
            async: false,
            mangle: false,
            headerIds: false,
            renderer
        });

        return marked.parseInline(text).replaceAll("&lt;br&gt;", "\n").replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
        }).replaceAll("<u>", "").replaceAll("</u>", "").replaceAll("\\<u>", "<u>").replaceAll("\\</u>", "</u>");
    }

    /**
     * Transform a Markdown-formatted text into a {@link MessageFormatting},
     * converting the compatible formatting options.
     *
     * @param text - The text to use
     * @experimental
     */
    public static fromMarkdown(text: string) {
        let plain = MessageFormatting.plainFromMarkdown(text);
        let styles = [];
        text = text.replaceAll(/(?<!\n)<br>/gmi, "\n").replaceAll("<br>", "").replace(/(```)(.*)(\n)/gm, "$1$3").replace(/#+( |)(.*)/gm, "**$2**");

        let renderer = {};
        renderer['strong'] = (text) => {
            let start = -1;
            // @ts-ignore
            while (plain.replace(text, (_, offset) => { start = offset; return '\x00'.repeat(text.length); }) !== plain) {
                start = -1;
                plain = plain.replace(text, (_, offset) => { start = offset; return '\x00'.repeat(text.length); });

                styles.push({
                    style: "BOLD",
                    start,
                    length: text.length
                });

                start = -1;
            }
        };
        renderer['em'] = (text) => {
            let start = -1;
            // @ts-ignore
            while (plain.replace(text, (_, offset) => { start = offset; return '\x00'.repeat(text.length); }) !== plain) {
                start = -1;
                plain = plain.replace(text, (_, offset) => { start = offset; return '\x00'.repeat(text.length); });

                styles.push({
                    style: "ITALIC",
                    start,
                    length: text.length
                });

                start = -1;
            }
        };
        renderer['codespan'] = renderer['code'] = (text) => {
            let start = -1;
            // @ts-ignore
            while (plain.replace(text, (_, offset) => { start = offset; return '\x00'.repeat(text.length); }) !== plain) {
                start = -1;
                plain = plain.replace(text, (_, offset) => { start = offset; return '\x00'.repeat(text.length); });

                styles.push({
                    style: "MONOSPACE",
                    start,
                    length: text.length
                });

                start = -1;
            }
        };
        renderer['del'] = () => {
            let start = -1;
            // @ts-ignore
            while (plain.replace(text, (_, offset) => { start = offset; return '\x00'.repeat(text.length); }) !== plain) {
                start = -1;
                plain = plain.replace(text, (_, offset) => { start = offset; return '\x00'.repeat(text.length); });

                styles.push({
                    style: "STRIKETHROUGH",
                    start,
                    length: text.length
                });

                start = -1;
            }
        };

        marked.use({
            async: false,
            mangle: false,
            headerIds: false,
            renderer
        });

        marked.parseInline(text);
        styles = styles.filter(i => i.start !== -1);
        return new MessageFormatting(plain, styles);
    }
}