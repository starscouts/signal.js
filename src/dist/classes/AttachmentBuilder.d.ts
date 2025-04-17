import { IFilePath } from "../types/IFilePath";
import { IDataURI } from "../types/IDataURI";
import { IAttachmentBuilderData } from "../types/IAttachmentBuilderData";
/**
 * A helper to build an attachment to send to a message
 */
export declare class AttachmentBuilder {
    /**
     * The rest of the attachment as a URI that can be passed to signal-cli
     */
    uri: IFilePath | IDataURI;
    /**
     * @param data - A file path, data URI, or object to construct an attachment
     */
    constructor(data: IFilePath | IDataURI | IAttachmentBuilderData);
}
