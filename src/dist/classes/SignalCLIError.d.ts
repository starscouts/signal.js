/**
 * An error in signal-cli
 */
export declare class SignalCLIError extends Error {
    /**
     * Full path to the signal-cli executable
     */
    executable: string;
    /**
     * List of all the command parameters used with signal-cli
     */
    arguments: string[];
    /**
     * @param message - The error message
     * @param executable - The full path to the signal-cli executable
     * @param args - The list of all the command parameters used with signal-cli
     * @internal
     */
    constructor(message: string, executable?: string, args?: string[]);
}
