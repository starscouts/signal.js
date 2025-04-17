import { Client } from "./Client";
import { ICLIEvent } from "../types/ICLIEvent";
/**
 * A signal-cli event
 */
export declare class CLIEvent {
    /**
     * @internal
     * @param client
     * @param data
     */
    static fromEvent(client: Client, data: ICLIEvent): void;
}
