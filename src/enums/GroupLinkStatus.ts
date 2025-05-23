/**
 * The state of a group's invite link
 */
export enum GroupLinkStatus {
    /**
     * On
     */
    Enabled = "enabled",

    /**
     * On, approve new members
     */
    WithApproval = "withApproval",

    /**
     * Off
     * @default
     */
    Disabled = "disabled"
}