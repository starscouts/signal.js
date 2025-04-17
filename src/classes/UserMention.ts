import {User} from "./User";
import {IUserResolvable} from "../types/IUserResolvable";

/**
 * A mention of a user in a message
 */
export class UserMention {
    /**
     * The user's phone number
     */
    public number: string;

    /**
     * The user's UUID
     */
    public uuid?: string;

    /**
     * The start of the mention in the message
     */
    public start: number;

    /**
     * The length of the mention in the message
     */
    public length?: number = 1;

    /**
     * @param user - The {@link User} (or {@link IUserResolvable}) to mention
     * @param start - Where the mention should start in the message
     * @param length - How long the mention should be in the message
     * @internal
     */
    constructor(user: User | IUserResolvable, start?: number, length?: number) {
        this.number = user instanceof User ? user.number : user;
        this.start = start ?? 0;
        this.length = length ?? 1;
    }

    /**
     * Convert the mention to a format that can be passed to signal-cli
     */
    public toCLIFormat(): string {
        return this.start + ":" + this.length + ":" + this.number;
    }
}