/**
 * An error in signal-cli
 */
export class SignalCLIError extends Error {
    /**
     * Full path to the signal-cli executable
     */
    public executable: string;

    /**
     * List of all the command parameters used with signal-cli
     */
    public arguments: string[];

    /**
     * @param message - The error message
     * @param executable - The full path to the signal-cli executable
     * @param args - The list of all the command parameters used with signal-cli
     * @internal
     */
    constructor(message: string, executable?: string, args?: string[]) {
        super(message);
        this.name = "SignalCLIError";

        if (executable) this.executable = executable;
        if (args) this.arguments = args;
    }
}