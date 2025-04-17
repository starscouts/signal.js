import { IFilePath } from "./IFilePath";
import { Attachment } from "../classes/Attachment";
import { IDataURI } from "./IDataURI";
/**
 * A URL preview from a message
 */
export interface IChatMessageURLPreview {
    /**
     * The URL the preview points to
     *
     * Note that the URL has to be present in the
     * message for the preview to show up
     */
    url: string;
    /**
     * The title of the page the URL points to
     */
    title: string;
    /**
     * An (optional) description of the page the URL
     * points to
     */
    description?: string;
    /**
     * An image attached to the URL preview, if any
     */
    image?: IFilePath | Attachment | IDataURI;
}
