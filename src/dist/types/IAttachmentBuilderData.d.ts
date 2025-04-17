/// <reference types="node" />
import { IMimeType } from "./IMimeType";
/**
 * Data used by an {@link AttachmentBuilder} to create
 * an {@link Attachment} from an arbitrary Buffer
 */
export interface IAttachmentBuilderData {
    /**
     * The {@link Buffer} to create the Attachment from
     */
    data: Buffer;
    /**
     * Optionally, the file type of the {@link Attachment}
     *
     * If this is unset, it will be sent as binary
     * data (application/octet-stream)
     */
    type?: IMimeType;
    /**
     * An optional file name for the attachment
     */
    fileName?: string;
}
