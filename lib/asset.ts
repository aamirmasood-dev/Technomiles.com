import { BASE_PATH } from "./basePath";

/** Public-folder URL with the deploy sub-path (next/image does not add basePath itself). */
export const asset = (path: string) => `${BASE_PATH}${path}`;
