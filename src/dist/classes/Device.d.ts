import { Client } from "./Client";
/**
 * A device associated with the client's Signal account
 */
export declare class Device {
    /**
     * Device ID
     */
    id: number;
    /**
     * Name of the device, if applicable
     */
    name?: string;
    /**
     * {@link Date} the device was created (first seen) at
     */
    createdAt: Date;
    /**
     * {@link Date} the device was last seen at
     */
    lastSeenAt: Date;
    private client;
    /**
     * @internal
     * @param data - Data to reconstruct the device
     * @param client
     */
    constructor(data: any, client: Client);
    /**
     * Remove this device from the Signal account
     */
    remove(): Promise<void>;
}
