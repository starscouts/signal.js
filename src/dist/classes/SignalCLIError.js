"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalCLIError = void 0;
/**
 * An error in signal-cli
 */
class SignalCLIError extends Error {
    /**
     * @param message - The error message
     * @param executable - The full path to the signal-cli executable
     * @param args - The list of all the command parameters used with signal-cli
     * @internal
     */
    constructor(message, executable, args) {
        super(message);
        this.name = "SignalCLIError";
        if (executable)
            this.executable = executable;
        if (args)
            this.arguments = args;
    }
}
exports.SignalCLIError = SignalCLIError;
//# sourceMappingURL=SignalCLIError.js.map