export declare class SignalError extends Error {
    executable: string;
    arguments: string[];
    constructor(message: string, executable?: string, args?: string[]);
}
