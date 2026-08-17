import { IO } from './io.js';
export interface CrawlNode {
    readonly url: string;
    readonly depth: number;
    readonly outgoingLinks: readonly string[];
    readonly children: readonly CrawlNode[];
    readonly error?: string;
}
export interface CrawlState {
    readonly visited: ReadonlySet<string>;
    readonly pagesCrawled: number;
}
export interface CrawlConfig {
    readonly maxDepth: number;
    readonly maxPages?: number;
}
/**
 * Entry point for the purely functional recursive crawler.
 * Returns an IO computation containing the final CrawlNode tree structure.
 */
export declare function crawl(seedUrl: string, config: CrawlConfig, fetchHtml: (url: string) => IO<string>): IO<CrawlNode>;
