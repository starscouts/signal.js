/**
 * A type of message receipt
 */
export enum MessageReceipt {
    /**
     * The message was read
     * @default
     */
    Read = "read",

    /**
     * The message was viewed
     */
    Viewed = "viewed"
}