import { IMimeType } from "../types/IMimeType";
import { AttachmentSize } from "./AttachmentSize";
/**
 * An attachment added to a message
 */
export declare class Attachment {
    /**
     * Attachment MIME type
     */
    type: IMimeType;
    /**
     * Attachment file name
     */
    fileName: string;
    /**
     * Attachment file ID set by Signal
     */
    fileId: string;
    /**
     * Attachment size
     */
    size: AttachmentSize;
    /**
     * If the attachment is an image, its width
     */
    width?: number;
    /**
     * If the attachment is an image, its height
     */
    height?: number;
    /**
     * If the attachment is an image, its alternative text
     */
    caption?: string;
    /**
     * @param attachmentData - Data to use to construct the attachment
     * @internal
     */
    constructor(attachmentData: any);
}
