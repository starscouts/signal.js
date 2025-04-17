import { User } from "./User";
import { IUserProfileStatus } from "../types/IUserProfileStatus";
import { Client } from "./Client";
/**
 * A user profile with additional data
 */
export declare class UserProfile {
    /**
     * {@link User} this profile is associated with
     */
    user: User;
    /**
     * The Signal user name for this user
     */
    userName?: string;
    /**
     * Whether this user is blocked or not
     */
    blocked: boolean;
    /**
     * {@link Date} the profile was updated for the last time
     */
    lastUpdatedAt: Date;
    /**
     * User's first name
     */
    firstName?: string;
    /**
     * User's last name
     */
    lastName?: string;
    /**
     * User status message
     */
    status: IUserProfileStatus;
    /**
     * User MobileCoin address
     */
    mobileCoinAddress?: string;
    /**
     * @internal
     * @param data - The data to reconstruct the profile
     * @param client
     */
    constructor(data: any, client: Client);
}
