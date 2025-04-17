import { DataMessage } from "./DataMessage";
/**
 * A message editing an older message
 * @internal
 */
export declare class EditMessage extends DataMessage {
    /**
     * {@link Date} at which the original message was created
     */
    originalCreatedAt: Date;
    /**
     * Timestamp at which the original message was created
     */
    originalCreatedTimestamp: number;
}
