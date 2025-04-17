import { IFilePath } from "./IFilePath";
import { IDataURI } from "./IDataURI";
import { IChatMessageURLPreview } from "./IChatMessageURLPreview";
/**
 * A URL preview to be sent in a message
 */
export interface ISentMessageURLPreview extends IChatMessageURLPreview {
    /**
     * A path to a file or valid data: URI
     */
    image?: IFilePath | IDataURI;
}
