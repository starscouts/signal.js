/**
 * A size to associate with an Attachment
 */
export declare class AttachmentSize extends Number {
    /**
     * @internal
     * @param props
     */
    constructor(props: any);
    /**
     * Convert the size from bytes to bits
     */
    toBits(): number;
}
