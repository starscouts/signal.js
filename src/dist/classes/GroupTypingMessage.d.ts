import { User } from "./User";
import { GroupMessage } from "./GroupMessage";
import { Client } from "./Client";
import { TypingMessageAction } from "../enums/TypingMessageAction";
import { TypingMessage } from "./TypingMessage";
/**
 * A {@link TypingMessage} sent in a {@link Group}
 */
export declare class GroupTypingMessage extends GroupMessage implements TypingMessage {
    /**
     * Action associated with the typing message
     */
    action: TypingMessageAction;
    /**
     * @param user - The author of the message
     * @param action - The action associated with the typing message
     * @param time - The timestamp the message was sent at
     * @param groupId - The group the message was sent in
     * @param client
     * @internal
     */
    constructor(user: User, action: TypingMessageAction, time: number, groupId: string, client: Client);
}
