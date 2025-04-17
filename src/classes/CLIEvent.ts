import {Client} from "./Client";
import {ICLIEvent} from "../types/ICLIEvent";
import {GroupTypingMessage} from "./GroupTypingMessage";
import {User} from "./User";
import {DMTypingMessage} from "./DMTypingMessage";
import {GroupDataMessage} from "./GroupDataMessage";
import {DMDataMessage} from "./DMDataMessage";
import {UserDataType} from "../enums/UserDataType";
import {DMReactionMessage} from "./DMReactionMessage";
import {GroupReactionMessage} from "./GroupReactionMessage";
import {CLIDispatcher} from "./CLIDispatcher";
import {DMStickerMessage} from "./DMStickerMessage";
import {GroupStickerMessage} from "./GroupStickerMessage";
import {DMEditMessage} from "./DMEditMessage";
import {GroupEditMessage} from "./GroupEditMessage";
import {GroupDeleteMessage} from "./GroupDeleteMessage";
import {DMDeleteMessage} from "./DMDeleteMessage";
import {Group} from "./Group";

/**
 * A signal-cli event
 */
export class CLIEvent {
    /**
     * @internal
     * @param client
     * @param data
     */
    static fromEvent(client: Client, data: ICLIEvent) {
        client.emit("cliEvent", data);

        if (data.method === "receive") {
            if (data.params.envelope.typingMessage) {
                if (client.verbose) console.log(data.params.envelope.typingMessage);
                if (client.ignoreOldEvents && new Date().getTime() - data.params.envelope.typingMessage.timestamp > 60000) return;

                if (data.params.envelope.typingMessage.groupId) {
                    let message: GroupTypingMessage = new GroupTypingMessage(new User(data.params.envelope, UserDataType.Envelope, client), data.params.envelope.typingMessage.action, data.params.envelope.typingMessage.timestamp, data.params.envelope.typingMessage.groupId, client);

                    client.emit("typingMessage", message);
                } else {
                    let message: DMTypingMessage = new DMTypingMessage(new User(data.params.envelope, UserDataType.Envelope, client), data.params.envelope.typingMessage.action, data.params.envelope.typingMessage.timestamp, client);

                    client.emit("typingMessage", message);
                }
            } else if (data.params.envelope.editMessage) {
                if (client.verbose) console.log(data.params.envelope.editMessage);
                if (client.ignoreOldEvents && new Date().getTime() - data.params.envelope.editMessage.dataMessage.timestamp > 60000) return;

                if (data.params.envelope.editMessage.dataMessage.groupInfo) {
                    let message: GroupEditMessage = new GroupEditMessage(new User(data.params.envelope, UserDataType.Envelope, client), data.params.envelope.editMessage.dataMessage, data.params.envelope.editMessage.dataMessage.timestamp, data.params.envelope.editMessage.dataMessage.groupInfo.groupId, data.params.envelope.editMessage.targetSentTimestamp, client);

                    client.emit("editMessage", message);
                } else {
                    let message: DMEditMessage = new DMEditMessage(new User(data.params.envelope, UserDataType.Envelope, client), data.params.envelope.editMessage.dataMessage, data.params.envelope.editMessage.dataMessage.timestamp, data.params.envelope.editMessage.targetSentTimestamp, client);

                    client.emit("editMessage", message);
                }
            } else if (data.params.envelope.dataMessage) {
                if (client.verbose) console.log(data.params.envelope.dataMessage);
                if (client.ignoreOldEvents && new Date().getTime() - data.params.envelope.dataMessage.timestamp > 60000) return;

                if (data.params.envelope.dataMessage.groupInfo && data.params.envelope.dataMessage.groupInfo.type !== "DELIVER") {
                    if (data.params.envelope.dataMessage.groupInfo.type === "UPDATE") {
                        client.emit("groupUpdate", new Group(data.params.envelope.dataMessage.groupInfo.groupId, client));
                    }
                } else if (data.params.envelope.dataMessage.remoteDelete) {
                    if (data.params.envelope.dataMessage.groupInfo) {
                        let message: GroupDeleteMessage = new GroupDeleteMessage(new User(data.params.envelope, UserDataType.Envelope, client), data.params.envelope.dataMessage, data.params.envelope.dataMessage.timestamp, data.params.envelope.dataMessage.groupInfo.groupId, client, data.params.envelope.dataMessage.remoteDelete.timestamp);

                        client.emit("deleteMessage", message);
                    } else {
                        let message: DMDeleteMessage = new DMDeleteMessage(new User(data.params.envelope, UserDataType.Envelope, client), data.params.envelope.dataMessage, data.params.envelope.dataMessage.timestamp, client, data.params.envelope.dataMessage.remoteDelete.timestamp);

                        client.emit("deleteMessage", message);
                    }
                } else if (data.params.envelope.dataMessage.reaction) {
                    if (data.params.envelope.dataMessage.groupInfo) {
                        let message: GroupReactionMessage = new GroupReactionMessage(new User(data.params.envelope, UserDataType.Envelope, client), data.params.envelope.dataMessage, data.params.envelope.dataMessage.timestamp, data.params.envelope.dataMessage.groupInfo.groupId, client);

                        client.emit("reaction", message);

                        if (message.removed) {
                            client.emit("reactionRemove", message);
                        } else {
                            client.emit("reactionAdd", message);
                        }
                    } else {
                        let message: DMReactionMessage = new DMReactionMessage(new User(data.params.envelope, UserDataType.Envelope, client), data.params.envelope.dataMessage, data.params.envelope.dataMessage.timestamp, client);

                        client.emit("reaction", message);

                        if (message.removed) {
                            client.emit("reactionRemove", message);
                        } else {
                            client.emit("reactionAdd", message);
                        }
                    }
                } else if (data.params.envelope.dataMessage.sticker) {
                    CLIDispatcher.dispatch("listStickerPacks", {}, client.process).then((cliData) => {
                        client.stickerPacks['list'] = cliData.result;

                        if (data.params.envelope.dataMessage.groupInfo) {
                            let message: GroupStickerMessage = new GroupStickerMessage(new User(data.params.envelope, UserDataType.Envelope, client), data.params.envelope.dataMessage, data.params.envelope.dataMessage.timestamp, data.params.envelope.dataMessage.groupInfo.groupId, client);

                            client.emit("sticker", message);
                        } else {
                            let message: DMStickerMessage = new DMStickerMessage(new User(data.params.envelope, UserDataType.Envelope, client), data.params.envelope.dataMessage, data.params.envelope.dataMessage.timestamp, client);

                            client.emit("sticker", message);
                        }
                    })
                } else {
                    if (data.params.envelope.dataMessage.groupInfo) {
                        let message: GroupDataMessage = new GroupDataMessage(new User(data.params.envelope, UserDataType.Envelope, client), data.params.envelope.dataMessage, data.params.envelope.dataMessage.timestamp, data.params.envelope.dataMessage.groupInfo.groupId, client);

                        client.emit("message", message);
                    } else {
                        let message: DMDataMessage = new DMDataMessage(new User(data.params.envelope, UserDataType.Envelope, client), data.params.envelope.dataMessage, data.params.envelope.dataMessage.timestamp, client);

                        client.emit("message", message);
                    }
                }
            }
        }
    }
}