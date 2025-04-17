import { User } from "./User";
import { IUserResolvable } from "../types/IUserResolvable";
/**
 * A mention of a user in a message
 */
export declare class UserMention {
    /**
     * The user's phone number
     */
    number: string;
    /**
     * The user's UUID
     */
    uuid?: string;
    /**
     * The start of the mention in the message
     */
    start: number;
    /**
     * The length of the mention in the message
     */
    length?: number;
    /**
     * @param user - The {@link User} (or {@link IUserResolvable}) to mention
     * @param start - Where the mention should start in the message
     * @param length - How long the mention should be in the message
     * @internal
     */
    constructor(user: User | IUserResolvable, start?: number, length?: number);
    /**
     * Convert the mention to a format that can be passed to signal-cli
     */
    toCLIFormat(): string;
}
