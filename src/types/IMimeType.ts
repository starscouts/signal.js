/**
 * A valid MIME type
 * @interface
 */
export type IMimeType = `${"application" | "audio" | "image" | "message" | "multipart" | "text" | "video" | "font" | "example" | "model" | "chemical"}/${string}`;