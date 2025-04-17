/**
 * A size to associate with an Attachment
 */
export class AttachmentSize extends Number {
    /**
     * @internal
     * @param props
     */
    constructor(props) {
        super(props);
    }

    /**
     * Convert the size from bytes to bits
     */
    public toBits(): number {
        return parseInt(this.toString()) * 8;
    }
}