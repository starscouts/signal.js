/**
 * A preference shared across all devices that are logged into this account
 */
export enum SharedPreference {
    SendReadReceipts = "readReceipts",
    SealedSenderIndicator = "unidentifiedDeliveryIndicators",
    SendTypingIndicators = "typingIndicators",
    GenerateLinkPreviews = "linkPreviews"
}