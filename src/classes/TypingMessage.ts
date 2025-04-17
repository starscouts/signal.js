import {TypingMessageAction} from "../enums/TypingMessageAction";

/**
 * A typing message sent on Signal
 * @internal
 */
export class TypingMessage {
    /**
     * Action associated with the typing message
     */
    public action: TypingMessageAction;
}