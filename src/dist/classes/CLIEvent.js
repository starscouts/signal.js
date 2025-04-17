"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIEvent = void 0;
const GroupTypingMessage_1 = require("./GroupTypingMessage");
const User_1 = require("./User");
const DMTypingMessage_1 = require("./DMTypingMessage");
const GroupDataMessage_1 = require("./GroupDataMessage");
const DMDataMessage_1 = require("./DMDataMessage");
const UserDataType_1 = require("../enums/UserDataType");
const DMReactionMessage_1 = require("./DMReactionMessage");
const GroupReactionMessage_1 = require("./GroupReactionMessage");
const CLIDispatcher_1 = require("./CLIDispatcher");
const DMStickerMessage_1 = require("./DMStickerMessage");
const GroupStickerMessage_1 = require("./GroupStickerMessage");
const DMEditMessage_1 = require("./DMEditMessage");
const GroupEditMessage_1 = require("./GroupEditMessage");
const GroupDeleteMessage_1 = require("./GroupDeleteMessage");
const DMDeleteMessage_1 = require("./DMDeleteMessage");
const Group_1 = require("./Group");
/**
 * A signal-cli event
 */
class CLIEvent {
    /**
     * @internal
     * @param client
     * @param data
     */
    static fromEvent(client, data) {
        client.emit("cliEvent", data);
        if (data.method === "receive") {
            if (data.params.envelope.typingMessage) {
                if (client.verbose)
                    console.log(data.params.envelope.typingMessage);
                if (client.ignoreOldEvents && new Date().getTime() - data.params.envelope.typingMessage.timestamp > 60000)
                    return;
                if (data.params.envelope.typingMessage.groupId) {
                    let message = new GroupTypingMessage_1.GroupTypingMessage(new User_1.User(data.params.envelope, UserDataType_1.UserDataType.Envelope, client), data.params.envelope.typingMessage.action, data.params.envelope.typingMessage.timestamp, data.params.envelope.typingMessage.groupId, client);
                    client.emit("typingMessage", message);
                }
                else {
                    let message = new DMTypingMessage_1.DMTypingMessage(new User_1.User(data.params.envelope, UserDataType_1.UserDataType.Envelope, client), data.params.envelope.typingMessage.action, data.params.envelope.typingMessage.timestamp, client);
                    client.emit("typingMessage", message);
                }
            }
            else if (data.params.envelope.editMessage) {
                if (client.verbose)
                    console.log(data.params.envelope.editMessage);
                if (client.ignoreOldEvents && new Date().getTime() - data.params.envelope.editMessage.dataMessage.timestamp > 60000)
                    return;
                if (data.params.envelope.editMessage.dataMessage.groupInfo) {
                    let message = new GroupEditMessage_1.GroupEditMessage(new User_1.User(data.params.envelope, UserDataType_1.UserDataType.Envelope, client), data.params.envelope.editMessage.dataMessage, data.params.envelope.editMessage.dataMessage.timestamp, data.params.envelope.editMessage.dataMessage.groupInfo.groupId, data.params.envelope.editMessage.targetSentTimestamp, client);
                    client.emit("editMessage", message);
                }
                else {
                    let message = new DMEditMessage_1.DMEditMessage(new User_1.User(data.params.envelope, UserDataType_1.UserDataType.Envelope, client), data.params.envelope.editMessage.dataMessage, data.params.envelope.editMessage.dataMessage.timestamp, data.params.envelope.editMessage.targetSentTimestamp, client);
                    client.emit("editMessage", message);
                }
            }
            else if (data.params.envelope.dataMessage) {
                if (client.verbose)
                    console.log(data.params.envelope.dataMessage);
                if (client.ignoreOldEvents && new Date().getTime() - data.params.envelope.dataMessage.timestamp > 60000)
                    return;
                if (data.params.envelope.dataMessage.groupInfo && data.params.envelope.dataMessage.groupInfo.type !== "DELIVER") {
                    if (data.params.envelope.dataMessage.groupInfo.type === "UPDATE") {
                        client.emit("groupUpdate", new Group_1.Group(data.params.envelope.dataMessage.groupInfo.groupId, client));
                    }
                }
                else if (data.params.envelope.dataMessage.remoteDelete) {
                    if (data.params.envelope.dataMessage.groupInfo) {
                        let message = new GroupDeleteMessage_1.GroupDeleteMessage(new User_1.User(data.params.envelope, UserDataType_1.UserDataType.Envelope, client), data.params.envelope.dataMessage, data.params.envelope.dataMessage.timestamp, data.params.envelope.dataMessage.groupInfo.groupId, client, data.params.envelope.dataMessage.remoteDelete.timestamp);
                        client.emit("deleteMessage", message);
                    }
                    else {
                        let message = new DMDeleteMessage_1.DMDeleteMessage(new User_1.User(data.params.envelope, UserDataType_1.UserDataType.Envelope, client), data.params.envelope.dataMessage, data.params.envelope.dataMessage.timestamp, client, data.params.envelope.dataMessage.remoteDelete.timestamp);
                        client.emit("deleteMessage", message);
                    }
                }
                else if (data.params.envelope.dataMessage.reaction) {
                    if (data.params.envelope.dataMessage.groupInfo) {
                        let message = new GroupReactionMessage_1.GroupReactionMessage(new User_1.User(data.params.envelope, UserDataType_1.UserDataType.Envelope, client), data.params.envelope.dataMessage, data.params.envelope.dataMessage.timestamp, data.params.envelope.dataMessage.groupInfo.groupId, client);
                        client.emit("reaction", message);
                        if (message.removed) {
                            client.emit("reactionRemove", message);
                        }
                        else {
                            client.emit("reactionAdd", message);
                        }
                    }
                    else {
                        let message = new DMReactionMessage_1.DMReactionMessage(new User_1.User(data.params.envelope, UserDataType_1.UserDataType.Envelope, client), data.params.envelope.dataMessage, data.params.envelope.dataMessage.timestamp, client);
                        client.emit("reaction", message);
                        if (message.removed) {
                            client.emit("reactionRemove", message);
                        }
                        else {
                            client.emit("reactionAdd", message);
                        }
                    }
                }
                else if (data.params.envelope.dataMessage.sticker) {
                    CLIDispatcher_1.CLIDispatcher.dispatch("listStickerPacks", {}, client.process).then((cliData) => {
                        client.stickerPacks['list'] = cliData.result;
                        if (data.params.envelope.dataMessage.groupInfo) {
                            let message = new GroupStickerMessage_1.GroupStickerMessage(new User_1.User(data.params.envelope, UserDataType_1.UserDataType.Envelope, client), data.params.envelope.dataMessage, data.params.envelope.dataMessage.timestamp, data.params.envelope.dataMessage.groupInfo.groupId, client);
                            client.emit("sticker", message);
                        }
                        else {
                            let message = new DMStickerMessage_1.DMStickerMessage(new User_1.User(data.params.envelope, UserDataType_1.UserDataType.Envelope, client), data.params.envelope.dataMessage, data.params.envelope.dataMessage.timestamp, client);
                            client.emit("sticker", message);
                        }
                    });
                }
                else {
                    if (data.params.envelope.dataMessage.groupInfo) {
                        let message = new GroupDataMessage_1.GroupDataMessage(new User_1.User(data.params.envelope, UserDataType_1.UserDataType.Envelope, client), data.params.envelope.dataMessage, data.params.envelope.dataMessage.timestamp, data.params.envelope.dataMessage.groupInfo.groupId, client);
                        client.emit("message", message);
                    }
                    else {
                        let message = new DMDataMessage_1.DMDataMessage(new User_1.User(data.params.envelope, UserDataType_1.UserDataType.Envelope, client), data.params.envelope.dataMessage, data.params.envelope.dataMessage.timestamp, client);
                        client.emit("message", message);
                    }
                }
            }
        }
    }
}
exports.CLIEvent = CLIEvent;
//# sourceMappingURL=CLIEvent.js.map