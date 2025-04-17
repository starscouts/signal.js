import {QuoteMessage} from "./QuoteMessage";
import {Client} from "./Client";

/**
 * A helper class to build a quote to send
 */
export class QuoteBuilder {
    /**
     * Timestamp at which the quoted message was sent
     */
    public timestamp: number;

    /**
     * Number of the author of the quoted message
     */
    public author: string;

    /**
     * Text of the quoted message
     */
    public content?: string;
    private client: Client;

    /**
     * @param client
     * @param timestamp - The timestamp at which the quoted message was sent
     * @param number - The number of the author of the quoted message
     * @param text - The text of the quoted message
     */
    constructor(client: Client, timestamp: number, number: string, text?: string) {
        this.client = client;
        this.timestamp = timestamp;
        this.author = number;
        this.content = text;
    }

    /**
     * Transform the {@link QuoteBuilder} into a valid {@link QuoteMessage}
     */
    public build(): QuoteMessage {
        return new QuoteMessage({
            authorNumber: this.author, id: this.timestamp, text: this.content
        }, this.client);
    }
}