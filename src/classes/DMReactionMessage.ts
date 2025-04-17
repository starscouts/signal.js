import {User} from "./User";
import {DMMessage} from "./DMMessage";
import {DM} from "./DM";
import {Client} from "./Client";
import {Emoji} from "./Emoji";
import {ReactionTarget} from "./ReactionTarget";
import {ReactionMessage} from "./ReactionMessage";

/**
 * A reaction message sent in a {@link DM}
 */
export class DMReactionMessage extends DMMessage implements ReactionMessage {
    /**
     * Emoji that was used for the reaction
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

    /**
     * @param user - The author of the message
     * @param data - Data associated with the reaction
     * @param time - The timestamp the message was sent at
     * @param client
     * @internal
     */
    constructor(user: User, data: any, time: number, client: Client) {
        super(user, time, new DM(user.uuid, user.number, client), client, data.expiresInSeconds);
        this.removed = data.reaction.isRemove;
        this.emoji = new Emoji(data.reaction.emoji);
        this.target = new ReactionTarget(data, this.channel, client);
    }
}