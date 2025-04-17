import {UUID} from "crypto";

/**
 * A request to be sent to signal-cli
 * @internal
 */
export interface ICLIRequest {
    /**
     * The version of JSON-RPC used by signal-cli
     */
    jsonrpc: "2.0",

    /**
     * The method used for the request
     *
     * A list of the available methods can be accessed
     * using `signal-cli --help`
     */
    method: string,

    /**
     * The parameters used with this method
     *
     * All parameters use camelCase instead of the original
     * hyphen-format shown in signal-cli
     */
    params: any,
    id: UUID
}