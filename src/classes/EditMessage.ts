import {DataMessage} from "./DataMessage";

/**
 * A message editing an older message
 * @internal
 */
export class EditMessage extends DataMessage {
    /**
     * {@link Date} at which the original message was created
     */
    public originalCreatedAt: Date;

    /**
     * Timestamp at which the original message was created
     */
    public originalCreatedTimestamp: number;
}