import { ISystemConfig } from "./ISystemConfig";
import { ConfigTrustLevel } from "../enums/ConfigTrustLevel";
import { ConfigEnvironment } from "../enums/ConfigEnvironment";
/**
 * Signal.js configuration options
 */
export interface IConfig {
    /**
     * The phone number that has been previously associated with signal-cli
     * that signal.js will use.
     *
     * `--account` in signal-cli
     */
    account: string;
    /**
     * Whether events should be shown to `console.log`, used mainly for debugging
     */
    logEvents?: boolean;
    /**
     * An absolute or relative (to `process.cwd`) path to a custom
     * signal-cli executable.
     *
     * Leave this unset to use the bundled signal-cli executable.
     * Using a custom incompatible executable may cause issues and
     * unintended behavior, proceed with caution.
     */
    signalCli?: string;
    /**
     * An optional path to a custom config directory for signal-cli.
     *
     * `--config` in signal-cli
     */
    configPath?: string;
    /**
     * Whether old events (events sent while the client was offline)
     * should be processed or ignored. true will ignore and false will
     * process.
     *
     * @default true
     */
    ignoreOldEvents?: boolean;
    /**
     * The server environment to use with signal-cli.
     * Leave the default if you don't know what you're doing.
     *
     * `--service-environment` in signal-cli
     */
    environment?: ConfigEnvironment;
    /**
     * A file signal-cli will save logs to
     *
     * Note: Unless `scrubLog` is true, this will contain personal information,
     * such as the exchanged messages.
     *
     * `--log-file` in signal-cli
     */
    cliLog?: string;
    /**
     * Only save technical information to the logs and remove any personal
     * information.
     *
     * `--scrub-log` in signal-cli
     */
    scrubLog?: boolean;
    /**
     * When to trust new identities.
     *
     * `--trust-new-identities` in signal-cli
     */
    trustLevel?: ConfigTrustLevel;
    /**
     * Advanced parameters for the signal-cli process
     */
    system?: ISystemConfig;
}
