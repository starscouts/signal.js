import { IChatMessageOptions } from "../types/IChatMessageOptions";
export declare class Chat {
    group: boolean;
    id: string;
    constructor();
    send(text: string, options?: IChatMessageOptions): Promise<void>;
}
