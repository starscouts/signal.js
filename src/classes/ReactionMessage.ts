import {Emoji} from "./Emoji";
import {ReactionTarget} from "./ReactionTarget";

/**
 * A reaction message
 * @internal
 */
export class ReactionMessage {
    /**
     * {@link Emoji} that was used for the reaction
     */
    public emoji: Emoji;

    /**
     * Whether the reaction is a removal
     */
    public removed: boolean;

    /**
     * Message targetted by the reaction
     */
    public target: ReactionTarget;
}