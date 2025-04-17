/// <reference types="node" />
import { ChildProcess } from "child_process";
/**
 * A dispatcher used to send requests to signal-cli and receive a response
 */
export declare class CLIDispatcher {
    /**
     * Dispatch a request to signal-cli
     *
     * @param method - The method to associate with the request.
     * Use `signal-cli --help` to get a full list
     * @param params - The parameters to pass with the request.
     * Use `signal-cli <method> --help` to get a full list for the current method
     * @param proc - The signal-cli process to dispatch to
     */
    static dispatch(method: string, params: any, proc: ChildProcess): Promise<any>;
}
