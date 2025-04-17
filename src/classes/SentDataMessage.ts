import {Client} from "./Client";
import {DM} from "./DM";
import {Group} from "./Group";
import {IChatMessageOptions} from "../types/IChatMessageOptions";
import {SentMessage} from "./SentMessage";
import {CLIDispatcher} from "./CLIDispatcher";

/**
 * A text message sent to Signal
 */
export class SentDataMessage extends SentMessage {
    /**
     * Text of the message
     */
    public content: string;

    /**
     * Options used to build the message
     */
    public options?: IChatMessageOptions;

    /**
     * @param time - The timestamp at which the message was sent
     * @param channel - The channel the message was sent in
     * @param client
     * @param content - The text of the message
     * @param options - The options used to build the message
     * @internal
     */
    constructor(time: number, channel: DM | Group, client: Client, content: string, options?: IChatMessageOptions) {
        super(time, channel, client);
        this.content = content;
        this.options = options;
    }

    /**
     * Edit the message
     * @param text - The new text of the message
     * @param options - The new options used to build the message
     */
    public async edit(text: string, options?: IChatMessageOptions): Promise<SentDataMessage> {
        if (options) {
            options.original = this.createdTimestamp;
        } else {
            options = {
                original: this.createdTimestamp
            }
        }

        return await this.channel.send(text, options);
    }

    /**
     * Delete the message
     */
    public async delete(): Promise<void> {
        if (this.channel instanceof Group) {
            let groupData = await CLIDispatcher.dispatch("listGroups", {}, this.client.process);

            await CLIDispatcher.dispatch("remoteDelete", {
                groupId: this.channel.id,
                recipient: groupData['result'].filter(i => i.id === this.channel.id)[0].members.map(i => i.number),
                targetTimestamp: this.createdTimestamp
            }, this.client.process);
        } else {
            await CLIDispatcher.dispatch("remoteDelete", {
                recipient: [this.channel.number], targetTimestamp: this.createdTimestamp
            }, this.client.process);
        }
    }
}