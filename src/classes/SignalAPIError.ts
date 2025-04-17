/**
 * An error in the Signal API
 */
export class SignalAPIError extends Error {
    /**
     * Internal error code for this error or category of errors
     */
    public code: number;

    /**
     * @param message - The error message
     * @param code - The internal error code for this error or category of errors
     * @internal
     */
    constructor(message: string, code?: number) {
        const errorCodes = {
            '-1': "USER_ERROR", '-3': "IO_ERROR", '-4': "UNTRUSTED_KEY_ERROR"
        }

        super(message);
        this.name = "SignalAPIError";

        if (code) {
            this.code = code;
            this.message = "[" + (errorCodes[code.toString()] ?? code) + "] " + this.message;
        }
    }
}