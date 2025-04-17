/**
 * The type of data used to construct a {@link User}
 */
export declare enum UserDataType {
    /**
     * From an encrypted message
     */
    Envelope = 0,
    /**
     * From a quote inside a message
     */
    Quote = 1,
    /**
     * From a reaction message
     */
    Reaction = 2,
    /**
     * From a mention or a group user
     */
    MentionOrGroup = 3,
    /**
     * From an arbitrary phone number
     */
    Number = 4,
    /**
     * From a user's profile or identity
     */
    ProfileOrIdentity = 5
}
