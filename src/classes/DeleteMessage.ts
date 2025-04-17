/**
 * A deletion message sent on Signal
 * @internal
 */
export class DeleteMessage {
    /**
     * {@link Date} at which the original message was created
     */
    public originalCreatedAt: Date;

    /**
     * Timestamp at which the original message was created
     */
    public originalCreatedTimestamp: number;
}