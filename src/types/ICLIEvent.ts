/**
 * An event received from signal-cli that is not associated
 * with any earlier request
 */
export interface ICLIEvent {
    /**
     * The version of JSON-RPC used by signal-cli
     */
    jsonrpc: "2.0",

    /**
     * The method used internally to receive this
     * event (usually "receive")
     */
    method: string,

    /**
     * The data received from the event
     */
    params: {
        /**
         * The decrypted message
         */
        envelope: any,

        /**
         * The phone number of the account that received the event
         */
        account: string,

        /**
         * Undocumented, but we suppose this has something to do with
         * the account having a Signal badge or not.
         *
         * If you know what this does, feel free to edit this
         */
        subscription: number
    }
}