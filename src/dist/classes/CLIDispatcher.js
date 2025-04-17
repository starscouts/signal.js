"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIDispatcher = void 0;
const crypto_1 = require("crypto");
const SignalAPIError_1 = require("./SignalAPIError");
/**
 * A dispatcher used to send requests to signal-cli and receive a response
 */
class CLIDispatcher {
    /**
     * Dispatch a request to signal-cli
     *
     * @param method - The method to associate with the request.
     * Use `signal-cli --help` to get a full list
     * @param params - The parameters to pass with the request.
     * Use `signal-cli <method> --help` to get a full list for the current method
     * @param proc - The signal-cli process to dispatch to
     */
    static dispatch(method, params, proc) {
        return new Promise((res, rej) => {
            let id = (0, crypto_1.randomUUID)();
            let payload = {
                jsonrpc: "2.0", method, params, id
            };
            let lastData;
            let callback = (chunk) => {
                if (chunk.toString().trim() === "")
                    return;
                for (let line of chunk.toString().trim().replaceAll("\r\n").split("\n")) {
                    try {
                        JSON.parse(line);
                        lastData = null;
                    }
                    catch (e) {
                        if (lastData) {
                            line = lastData + line;
                            try {
                                JSON.parse(line);
                                lastData = null;
                            }
                            catch (e) {
                                lastData = line;
                            }
                        }
                        else {
                            lastData = line;
                        }
                    }
                    if (!lastData) {
                        let data = JSON.parse(line);
                        if (data.error) {
                            rej(new SignalAPIError_1.SignalAPIError(data.error.message ?? null, data.error.code ?? null));
                        }
                        if (data.id === id) {
                            res(data);
                            proc.stdout.removeListener("data", callback);
                        }
                    }
                }
            };
            proc.stdout.addListener('data', callback);
            proc.stdin.write(JSON.stringify(payload) + "\n");
        });
    }
}
exports.CLIDispatcher = CLIDispatcher;
//# sourceMappingURL=CLIDispatcher.js.map