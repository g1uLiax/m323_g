import { CrawlNode } from './crawler.js';
/**
 * Pure function to combine tree structure and detail lists into a final Markdown report.
 */
export declare function formatCrawlResult(root: CrawlNode, seedUrl: string, maxDepth: number, maxPages?: number): string;
