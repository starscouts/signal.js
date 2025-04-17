"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalError = void 0;
class SignalError extends Error {
    constructor(message, executable, args) {
        super(message);
        this.name = "SignalError";
        if (executable)
            this.executable = executable;
        if (args)
            this.arguments = args;
    }
}
exports.SignalError = SignalError;
//# sourceMappingURL=SignalError.js.map