/**
 * An error in the Signal API
 */
export declare class SignalAPIError extends Error {
    /**
     * Internal error code for this error or category of errors
     */
    code: number;
    /**
     * @param message - The error message
     * @param code - The internal error code for this error or category of errors
     * @internal
     */
    constructor(message: string, code?: number);
}
