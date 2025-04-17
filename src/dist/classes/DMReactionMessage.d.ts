import { User } from "./User";
import { DMMessage } from "./DMMessage";
import { Client } from "./Client";
import { Emoji } from "./Emoji";
import { ReactionTarget } from "./ReactionTarget";
import { ReactionMessage } from "./ReactionMessage";
/**
 * A reaction message sent in a {@link DM}
 */
export declare class DMReactionMessage extends DMMessage implements ReactionMessage {
    /**
     * Emoji that was used for the reaction
     */
    emoji: Emoji;
    /**
     * Whether the reaction is a removal
     */
    removed: boolean;
    /**
     * Message targetted by the reaction
     */
    target: ReactionTarget;
    /**
     * @param user - The author of the message
     * @param data - Data associated with the reaction
     * @param time - The timestamp the message was sent at
     * @param client
     * @internal
     */
    constructor(user: User, data: any, time: number, client: Client);
}
