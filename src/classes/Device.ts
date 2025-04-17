import {Client} from "./Client";
import {CLIDispatcher} from "./CLIDispatcher";

/**
 * A device associated with the client's Signal account
 */
export class Device {
    /**
     * Device ID
     */
    public id: number;

    /**
     * Name of the device, if applicable
     */
    public name?: string;

    /**
     * {@link Date} the device was created (first seen) at
     */
    public createdAt: Date;

    /**
     * {@link Date} the device was last seen at
     */
    public lastSeenAt: Date;
    private client: Client;

    /**
     * @internal
     * @param data - Data to reconstruct the device
     * @param client
     */
    constructor(data: any, client: Client) {
        this.id = data.id;
        this.name = data.name;
        this.createdAt = new Date(data.createdTimestamp);
        this.lastSeenAt = new Date(data.lastSeenTimestamp);
        this.client = client;
    }

    /**
     * Remove this device from the Signal account
     */
    public async remove() {
        await CLIDispatcher.dispatch("removeDevice", {
            deviceId: this.id
        }, this.client.process);
    }
}