import {User} from "./User";
import {Client} from "./Client";
import {UserDataType} from "../enums/UserDataType";

export class Identity {
    /**
     * {@link User} this identity corresponds to
     */
    public user: User;

    /**
     * Fingerprint of the key used by this identity
     */
    public fingerprint: string;

    /**
     * Safety number for this identity
     */
    public safetyNumber: string;

    /**
     * Version of the safety number that can be converted to a QR code
     */
    public safetyNumberScannable: string;

    /**
     * Whether the identity is trusted (verified) or not
     */
    public trusted: boolean;

    /**
     * {@link Date} at which the identity was first seen
     */
    public addedAt: Date;

    /**
     * @internal
     * @param data - The data used to construct the identity
     * @param client
     */
    constructor(data: any, client: Client) {
        this.user = new User(data, UserDataType.ProfileOrIdentity, client);
        this.fingerprint = data.fingerprint;
        this.safetyNumber = data.safetyNumber;
        this.safetyNumberScannable = data.scannableSafetyNumber;
        this.trusted = data.trustLevel === "TRUSTED_VERIFIED";
        this.addedAt = new Date(data.addedTimestamp);
    }
}