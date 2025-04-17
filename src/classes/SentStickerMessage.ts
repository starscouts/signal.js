import {Client} from "./Client";
import {DM} from "./DM";
import {Group} from "./Group";
import {SentMessage} from "./SentMessage";
import {CLIDispatcher} from "./CLIDispatcher";
import {Sticker} from "./Sticker";

/**
 * A sticker as sent to Signal
 */
export class SentStickerMessage extends SentMessage {
    /**
     * {@link Sticker} that was sent
     */
    public sticker: Sticker;

    /**
     * @param time - The timestamp at which the sticker was sent
     * @param channel - The channel the sticker was sent at
     * @param client
     * @param sticker - The sticker that was sent
     * @internal
     */
    constructor(time: number, channel: DM | Group, client: Client, sticker: Sticker) {
        super(time, channel, client);
        this.sticker = sticker;
    }

    /**
     * Delete the sticker message
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