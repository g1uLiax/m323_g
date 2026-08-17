/**
 * Pure functions for parsing and resolving URLs from HTML content.
 */
/**
 * Extracts raw values of 'href' attributes from HTML anchor tags.
 * This is a pure function that relies on RegExp.
 */
export declare function extractRawUrls(html: string): readonly string[];
/**
 * Resolves a raw URL path against a base URL and normalizes it.
 * Normalization includes:
 * - Converting relative paths to absolute URLs.
 * - Stripping hash fragments (e.g. #section).
 * - Ensuring the protocol is http or https.
 *
 * Returns the resolved URL, or null if the URL is invalid or unsupported.
 */
export declare function resolveAndNormalizeUrl(rawUrl: string, baseUrl: string): string | null;
/**
 * Combined pure function that extracts, resolves, normalizes, and filters
 * all valid HTTP/HTTPS links from an HTML body relative to a base URL.
 */
export declare function extractValidLinks(html: string, baseUrl: string): readonly string[];
