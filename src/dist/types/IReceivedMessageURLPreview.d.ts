import { Attachment } from "../classes/Attachment";
import { IChatMessageURLPreview } from "./IChatMessageURLPreview";
/**
 * A URL preview to be sent in a message
 */
export interface IReceivedMessageURLPreview extends IChatMessageURLPreview {
    /**
     * The received image attached to the URL preview
     */
    image?: Attachment;
}
