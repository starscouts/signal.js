"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalAPIError = void 0;
/**
 * An error in the Signal API
 */
class SignalAPIError extends Error {
    /**
     * @param message - The error message
     * @param code - The internal error code for this error or category of errors
     * @internal
     */
    constructor(message, code) {
        const errorCodes = {
            '-1': "USER_ERROR", '-3': "IO_ERROR", '-4': "UNTRUSTED_KEY_ERROR"
        };
        super(message);
        this.name = "SignalAPIError";
        if (code) {
            this.code = code;
            this.message = "[" + (errorCodes[code.toString()] ?? code) + "] " + this.message;
        }
    }
}
exports.SignalAPIError = SignalAPIError;
//# sourceMappingURL=SignalAPIError.js.map