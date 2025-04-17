import { IMimeType } from "./IMimeType";
/**
 * A RFC2397-compliant data: URI
 * @interface
 */
export type IDataURI = `data:${IMimeType};base64,${string}` | `data:${IMimeType};filename=${string};base64,${string}`;
