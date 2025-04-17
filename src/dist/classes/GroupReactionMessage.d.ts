import { User } from "./User";
import { GroupMessage } from "./GroupMessage";
import { Client } from "./Client";
import { Emoji } from "./Emoji";
import { ReactionTarget } from "./ReactionTarget";
import { ReactionMessage } from "./ReactionMessage";
/**
 * A reaction message sent in a {@link Group}
 */
export declare class GroupReactionMessage extends GroupMessage implements ReactionMessage {
    /**
     * {@link Emoji} that was used for the reaction
     */
    emoji: Emoji;
    /**
     * Whether the reaction is a removal
     */
    removed: boolean;
    /**
     * Message targeted by the reaction
     */
    target: ReactionTarget;
    /**
     * @param user - The author of the message
     * @param data - Data associated with the reaction
     * @param time - The timestamp the message was sent at
     * @param groupId - The group the message was sent in
     * @param client
     * @internal
     */
    constructor(user: User, data: any, time: number, groupId: string, client: Client);
}
