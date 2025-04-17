/**
 * The type of data used to construct a {@link User}
 */
export enum UserDataType {
    /**
     * From an encrypted message
     */
    Envelope,

    /**
     * From a quote inside a message
     */
    Quote,

    /**
     * From a reaction message
     */
    Reaction,

    /**
     * From a mention or a group user
     */
    MentionOrGroup,

    /**
     * From an arbitrary phone number
     */
    Number,

    /**
     * From a user's profile or identity
     */
    ProfileOrIdentity
}