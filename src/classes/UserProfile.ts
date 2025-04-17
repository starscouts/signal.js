import {User} from "./User";
import {IUserProfileStatus} from "../types/IUserProfileStatus";
import {Client} from "./Client";
import {UserDataType} from "../enums/UserDataType";
import {Emoji} from "./Emoji";

/**
 * A user profile with additional data
 */
export class UserProfile {
    /**
     * {@link User} this profile is associated with
     */
    public user: User;

    /**
     * The Signal user name for this user
     */
    public userName?: string;

    /**
     * Whether this user is blocked or not
     */
    public blocked: boolean;

    /**
     * {@link Date} the profile was updated for the last time
     */
    public lastUpdatedAt: Date;

    /**
     * User's first name
     */
    public firstName?: string;

    /**
     * User's last name
     */
    public lastName?: string;

    /**
     * User status message
     */
    public status: IUserProfileStatus;

    /**
     * User MobileCoin address
     */
    public mobileCoinAddress?: string;

    /**
     * @internal
     * @param data - The data to reconstruct the profile
     * @param client
     */
    constructor(data: any, client: Client) {
        this.user = new User(data, UserDataType.ProfileOrIdentity, client);
        this.userName = data.username;
        this.blocked = data.isBlocked;
        this.lastUpdatedAt = new Date(data.profile.lastUpdateTimestamp);
        this.firstName = data.givenName && data.givenName.trim() !== "" ? data.givenName : null;
        this.lastName = data.lastName && data.lastName.trim() !== "" ? data.lastName : null;
        this.status = {
            text: data.profile.about && data.profile.about.trim() !== "" ? data.profile.about : null,
            emoji: data.profile.aboutEmoji && data.profile.aboutEmoji.trim() !== "" ? new Emoji(data.profile.aboutEmoji) : null
        }
        this.mobileCoinAddress = data.mobileCoinAddress;
    }
}