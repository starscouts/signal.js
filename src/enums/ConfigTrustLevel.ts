/**
 * The amount of trust the client should give to
 * contacts
 */
export enum ConfigTrustLevel {
    /**
     * Always trust new identities
     */
    All = "always",

    /**
     * Trust new identities on first use
     * @default
     */
    OnFirstUse = "on-first-use",

    /**
     * Never trust new identities
     */
    None = "never"
}