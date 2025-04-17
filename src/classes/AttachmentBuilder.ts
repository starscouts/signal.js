import {IFilePath} from "../types/IFilePath";
import {IDataURI} from "../types/IDataURI";
import {IAttachmentBuilderData} from "../types/IAttachmentBuilderData";
import {lstatSync} from "fs";

/**
 * A helper to build an attachment to send to a message
 */
export class AttachmentBuilder {
    /**
     * The rest of the attachment as a URI that can be passed to signal-cli
     */
    public uri: IFilePath | IDataURI;

    /**
     * @param data - A file path, data URI, or object to construct an attachment
     */
    constructor(data: IFilePath | IDataURI | IAttachmentBuilderData) {
        if (typeof data === "string") {
            if (!data.startsWith("data:")) {
                lstatSync(data);
            }

            this.uri = data;
        } else {
            let type = data.type ?? "application/octet-stream";

            if (data.fileName) {
                this.uri = `data:${type};filename=${data.fileName.replaceAll(";", "\\;")};base64,${data.data.toString("base64")}`;
            } else {
                this.uri = `data:${type};base64,${data.data.toString("base64")}`;
            }
        }
    }
}