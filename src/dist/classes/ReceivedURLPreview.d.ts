import { IReceivedMessageURLPreview } from "../types/IReceivedMessageURLPreview";
import { Attachment } from "./Attachment";
/**
 * A URL preview in a received message
 */
export declare class ReceivedURLPreview {
    /**
     * URL for this preview
     */
    url: string;
    /**
     * Title of the preview
     */
    title: string;
    /**
     * Optional description of the preview
     */
    description?: string;
    /**
     * Optional {@link Attachment} of the preview's image
     */
    image?: Attachment;
    /**
     * @param data - Data to reconstruct the {@link ReceivedURLPreview}
     * @internal
     */
    constructor(data: any);
    /**
     * Build a URL preview object
     */
    build(): IReceivedMessageURLPreview;
}
