import {User} from "./User";
import {UserDataType} from "../enums/UserDataType";
import {ReceivedMessage} from "./ReceivedMessage";
import {DM} from "./DM";
import {Group} from "./Group";
import {Client} from "./Client";

/**
 * The target message for a reaction
 */
export class ReactionTarget extends ReceivedMessage {
    /**
     * @param data - The data to reconstruct the target message
     * @param channel - The channel the target message is in
     * @param client
     * @internal
     */
    constructor(data: any, channel: DM | Group, client: Client) {
        super(new User(data.reaction, UserDataType.Reaction, client), data.reaction.targetSentTimestamp, channel, client, null);
    }
}