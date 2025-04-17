import {User} from "./User";
import {DMMessage} from "./DMMessage";
import {DM} from "./DM";
import {Client} from "./Client";
import {TypingMessageAction} from "../enums/TypingMessageAction";

/**
 * A typing message sent in a {@link DM}
 */
export class DMTypingMessage extends DMMessage {
    /**
     * Action associated with the typing message
     */
    public action: TypingMessageAction;

    /**
     * @param user - The author of the message
     * @param action - The action associated with the typing message
     * @param time - The timestamp the message was sent at
     * @param client
     * @internal
     */
    constructor(user: User, action: TypingMessageAction, time: number, client: Client) {
        super(user, time, new DM(user.uuid, user.number, client), client);
        this.action = action;
    }
}