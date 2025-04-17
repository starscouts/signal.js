import { Emoji } from "./Emoji";
import { ReactionTarget } from "./ReactionTarget";
/**
 * A reaction message
 * @internal
 */
export declare class ReactionMessage {
    /**
     * {@link Emoji} that was used for the reaction
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
}
