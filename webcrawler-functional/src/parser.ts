/**
 * Pure functions for parsing and resolving URLs from HTML content.
 */

/**
 * Extracts raw values of 'href' attributes from HTML anchor tags.
 * This is a pure function that relies on RegExp.
 */
export function extractRawUrls(html: string): readonly string[] {
  const hrefRegex = /<a\s+(?:[^>]*?\s+)?href=["']([^"']+)["']/gi;
  const urls: string[] = [];
  let match;
  // To keep it pure, we do not mutate parameters and we return a new array
  const tempHtml = html; 
  while ((match = hrefRegex.exec(tempHtml)) !== null) {
    urls.push(match[1]);
  }
  return Object.freeze(urls);
}

/**
 * Resolves a raw URL path against a base URL and normalizes it.
 * Normalization includes:
 * - Converting relative paths to absolute URLs.
 * - Stripping hash fragments (e.g. #section).
 * - Ensuring the protocol is http or https.
 * 
 * Returns the resolved URL, or null if the URL is invalid or unsupported.
 */
export function resolveAndNormalizeUrl(rawUrl: string, baseUrl: string): string | null {
  try {
    const resolved = new URL(rawUrl, baseUrl);
    
    // Only follow http and https links
    if (resolved.protocol !== 'http:' && resolved.protocol !== 'https:') {
      return null;
    }
    
    // Strip hash fragment
    resolved.hash = '';
    
    return resolved.href;
  } catch {
    // Return null if parsing fails (e.g. invalid URL string)
    return null;
  }
}

/**
 * Combined pure function that extracts, resolves, normalizes, and filters
 * all valid HTTP/HTTPS links from an HTML body relative to a base URL.
 */
export function extractValidLinks(html: string, baseUrl: string): readonly string[] {
  const rawUrls = extractRawUrls(html);
  
  const resolvedUrls = rawUrls
    .map(url => resolveAndNormalizeUrl(url, baseUrl))
    .filter((url): url is string => url !== null);
    
  // Return unique links
  return Object.freeze(Array.from(new Set(resolvedUrls)));
}
