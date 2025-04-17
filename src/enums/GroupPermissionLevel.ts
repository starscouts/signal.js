/**
 * A level for a permission in a group
 */
export enum GroupPermissionLevel {
    /**
     * All members
     * @default
     */
    Everyone = "EVERY_MEMBER",

    /**
     * Only Admins
     */
    Admins = "ONLY_ADMINS"
}