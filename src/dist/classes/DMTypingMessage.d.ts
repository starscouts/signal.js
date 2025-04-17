import { User } from "./User";
import { DMMessage } from "./DMMessage";
import { Client } from "./Client";
import { TypingMessageAction } from "../enums/TypingMessageAction";
/**
 * A typing message sent in a {@link DM}
 */
export declare class DMTypingMessage extends DMMessage {
    /**
     * Action associated with the typing message
     */
    action: TypingMessageAction;
    /**
     * @param user - The author of the message
     * @param action - The action associated with the typing message
     * @param time - The timestamp the message was sent at
     * @param client
     * @internal
     */
    constructor(user: User, action: TypingMessageAction, time: number, client: Client);
}
