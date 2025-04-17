import {IMimeType} from "../types/IMimeType";
import {AttachmentSize} from "./AttachmentSize";

/**
 * An attachment added to a message
 */
export class Attachment {
    /**
     * Attachment MIME type
     */
    public type: IMimeType;

    /**
     * Attachment file name
     */
    public fileName: string;

    /**
     * Attachment file ID set by Signal
     */
    public fileId: string;

    /**
     * Attachment size
     */
    public size: AttachmentSize;

    /**
     * If the attachment is an image, its width
     */
    public width?: number;

    /**
     * If the attachment is an image, its height
     */
    public height?: number;

    /**
     * If the attachment is an image, its alternative text
     */
    public caption?: string;

    /**
     * @param attachmentData - Data to use to construct the attachment
     * @internal
     */
    constructor(attachmentData: any) {
        this.type = attachmentData.contentType;
        this.fileName = attachmentData.filename;
        this.fileId = attachmentData.id;
        this.size = new AttachmentSize(attachmentData.size);
        this.width = attachmentData.width;
        this.height = attachmentData.height;
        this.caption = attachmentData.caption;
    }
}