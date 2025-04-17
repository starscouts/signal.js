/// <reference types="node" />
import { SpawnOptionsWithoutStdio } from "child_process";
/**
 * Configuration options used to configure the process
 */
export interface ISystemConfig {
    /**
     * Custom options to pass to `child_process.spawn`, use only if you know what you're doing as this WILL break stuff
     */
    spawn?: SpawnOptionsWithoutStdio;
    /**
     * Additional command-line arguments to pass to the signal-cli command
     */
    args?: string[];
}
