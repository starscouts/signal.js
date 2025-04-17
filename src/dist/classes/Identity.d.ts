import { User } from "./User";
import { Client } from "./Client";
export declare class Identity {
    /**
     * {@link User} this identity corresponds to
     */
    user: User;
    /**
     * Fingerprint of the key used by this identity
     */
    fingerprint: string;
    /**
     * Safety number for this identity
     */
    safetyNumber: string;
    /**
     * Version of the safety number that can be converted to a QR code
     */
    safetyNumberScannable: string;
    /**
     * Whether the identity is trusted (verified) or not
     */
    trusted: boolean;
    /**
     * {@link Date} at which the identity was first seen
     */
    addedAt: Date;
    /**
     * @internal
     * @param data - The data used to construct the identity
     * @param client
     */
    constructor(data: any, client: Client);
}
