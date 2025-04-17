import {IReceivedMessageURLPreview} from "../types/IReceivedMessageURLPreview";
import {Attachment} from "./Attachment";

/**
 * A URL preview in a received message
 */
export class ReceivedURLPreview {
    /**
     * URL for this preview
     */
    public url: string;

    /**
     * Title of the preview
     */
    public title: string;

    /**
     * Optional description of the preview
     */
    public description?: string;

    /**
     * Optional {@link Attachment} of the preview's image
     */
    public image?: Attachment;

    /**
     * @param data - Data to reconstruct the {@link ReceivedURLPreview}
     * @internal
     */
    constructor(data: any) {
        this.url = data.url;
        this.title = data.title;
        if (data.description) this.description = data.description;
        if (data.image) this.image = new Attachment(data.image);
    }

    /**
     * Build a URL preview object
     */
    public build(): IReceivedMessageURLPreview {
        return {
            url: this.url, title: this.title, description: this.description, image: this.image
        }
    }
}