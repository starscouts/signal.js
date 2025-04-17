import { User } from "./User";
import { Group } from "./Group";
import { DM } from "./DM";
import { Client } from "./Client";
export declare class Message {
    client: Client;
    author: User;
    createdAt: Date;
    createdTimestamp: number;
    channel: DM | Group;
    constructor(user: User, time: number, channel: DM | Group, client: Client);
}
