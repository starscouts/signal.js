"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    constructor(user, time, channel, client) {
        this.client = client;
        this.channel = channel;
        this.author = user;
        this.createdAt = new Date(time);
        this.createdTimestamp = time;
    }
}
exports.Message = Message;
//# sourceMappingURL=Message.js.map