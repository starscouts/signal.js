/**
 * A response sent by signal-cli
 * @internal
 */
export interface ICLIResponse {
    /**
     * The version of JSON-RPC used by signal-cli
     */
    jsonrpc: "2.0",

    /**
     * If the request has failed, an error message
     */
    error?: any,

    /**
     * One or more (positive) result(s) to the request, if it has
     * not failed.
     */
    result?: any,

    /**
     * The original ID associated with the request, repeated so that
     * the response can be associated with the original request.
     */
    id: string | null,
}