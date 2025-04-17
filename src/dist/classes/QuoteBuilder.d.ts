import { QuoteMessage } from "./QuoteMessage";
import { Client } from "./Client";
/**
 * A helper class to build a quote to send
 */
export declare class QuoteBuilder {
    /**
     * Timestamp at which the quoted message was sent
     */
    timestamp: number;
    /**
     * Number of the author of the quoted message
     */
    author: string;
    /**
     * Text of the quoted message
     */
    content?: string;
    private client;
    /**
     * @param client
     * @param timestamp - The timestamp at which the quoted message was sent
     * @param number - The number of the author of the quoted message
     * @param text - The text of the quoted message
     */
    constructor(client: Client, timestamp: number, number: string, text?: string);
    /**
     * Transform the {@link QuoteBuilder} into a valid {@link QuoteMessage}
     */
    build(): QuoteMessage;
}
