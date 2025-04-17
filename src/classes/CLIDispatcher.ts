import {ChildProcess} from "child_process";
import {randomUUID, UUID} from "crypto";
import {ICLIRequest} from "../types/ICLIRequest";
import {SignalAPIError} from "./SignalAPIError";

/**
 * A dispatcher used to send requests to signal-cli and receive a response
 */
export class CLIDispatcher {
    /**
     * Dispatch a request to signal-cli
     *
     * @param method - The method to associate with the request.
     * Use `signal-cli --help` to get a full list
     * @param params - The parameters to pass with the request.
     * Use `signal-cli <method> --help` to get a full list for the current method
     * @param proc - The signal-cli process to dispatch to
     */
    static dispatch(method: string, params: any, proc: ChildProcess): Promise<any> {
        return new Promise((res, rej) => {
            let id: UUID = randomUUID();
            let payload: ICLIRequest = {
                jsonrpc: "2.0", method, params, id
            }

            let lastData;

            let callback: (raw) => void = (chunk): void => {
                if (chunk.toString().trim() === "") return;

                for (let line of chunk.toString().trim().replaceAll("\r\n").split("\n")) {
                    try {
                        JSON.parse(line);
                        lastData = null;
                    } catch (e) {
                        if (lastData) {
                            line = lastData + line;

                            try {
                                JSON.parse(line);
                                lastData = null;
                            } catch (e) {
                                lastData = line;
                            }
                        } else {
                            lastData = line;
                        }
                    }

                    if (!lastData) {
                        let data = JSON.parse(line);

                        if (data.error) {
                            rej(new SignalAPIError(data.error.message ?? null, data.error.code ?? null));
                        }

                        if (data.id === id) {
                            res(data);
                            proc.stdout.removeListener("data", callback);
                        }
                    }
                }
            }

            proc.stdout.addListener('data', callback);
            proc.stdin.write(JSON.stringify(payload) + "\n");
        });
    }
}