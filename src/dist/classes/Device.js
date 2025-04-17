"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const CLIDispatcher_1 = require("./CLIDispatcher");
/**
 * A device associated with the client's Signal account
 */
class Device {
    /**
     * @internal
     * @param data - Data to reconstruct the device
     * @param client
     */
    constructor(data, client) {
        this.id = data.id;
        this.name = data.name;
        this.createdAt = new Date(data.createdTimestamp);
        this.lastSeenAt = new Date(data.lastSeenTimestamp);
        this.client = client;
    }
    /**
     * Remove this device from the Signal account
     */
    async remove() {
        await CLIDispatcher_1.CLIDispatcher.dispatch("removeDevice", {
            deviceId: this.id
        }, this.client.process);
    }
}
exports.Device = Device;
//# sourceMappingURL=Device.js.map