import * as fs from 'fs/promises';
import { IO } from './io.js';
import { crawl } from './crawler.js';
import { formatCrawlResult } from './formatter.js';

/**
 * Side-effect factory: constructs an IO wrapped HTTP fetch computation.
 * This encapsulates the external network request, using standard Node.js fetch
 * and supporting abort signals for connection timeouts.
 */
function makeFetchHtml(timeoutMs: number): (url: string) => IO<string> {
  return (url: string) => IO.of(async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    
    try {
      const response = await fetch(url, { 
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FunctionalWebcrawler/1.0)'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('text/html')) {
        throw new Error(`Invalid content-type: ${contentType} (expected text/html)`);
      }
      
      return await response.text();
    } finally {
      clearTimeout(timer);
    }
  });
}

/**
 * Main application runner.
 * Parses CLI inputs, builds the monadic IO sequence, and performs the unsafe execution.
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
🌳 Pure Functional Web Crawler

Usage:
  npm run start -- <url> [maxDepth] [maxPages] [timeoutMs] [outputFilePath]

Arguments:
  url             The seed URL to start crawling from (e.g. http://example.com) (Required)
  maxDepth        Maximum recursion depth (Default: 2)
  maxPages        Maximum number of total pages to crawl (Default: 30)
  timeoutMs       Network request timeout per page in milliseconds (Default: 5000)
  outputFilePath  File path to write the Markdown report (Default: ./crawl_report.md)

Examples:
  npm run start -- https://example.com
  npm run start -- https://example.com 3 10 3000 ./my_crawl.md
    `);
    process.exit(0);
  }

  const seedUrl = args[0];
  const maxDepth = args[1] !== undefined ? parseInt(args[1], 10) : 2;
  const maxPages = args[2] !== undefined ? parseInt(args[2], 10) : 30;
  const timeoutMs = args[3] !== undefined ? parseInt(args[3], 10) : 5000;
  const outputFilePath = args[4] !== undefined ? args[4] : './crawl_report.md';

  // Perform basic URL validation
  try {
    new URL(seedUrl);
  } catch {
    console.error(`Error: Invalid seed URL provided: "${seedUrl}"`);
    process.exit(1);
  }

  // Compose all side effects purely using the IO monad
  const crawlProgram = IO.of(() => console.log(`Starting crawl...\n  Seed URL: ${seedUrl}\n  Max Depth: ${maxDepth}\n  Max Pages: ${maxPages}\n  Timeout: ${timeoutMs}ms\n`))
    .flatMap(() => {
      const fetcher = makeFetchHtml(timeoutMs);
      return crawl(seedUrl, { maxDepth, maxPages }, fetcher);
    })
    .flatMap(rootNode => {
      return IO.of(() => {
        console.log('Crawl finished! Generating report...');
        return formatCrawlResult(rootNode, seedUrl, maxDepth, maxPages);
      });
    })
    .flatMap(markdownContent => {
      return IO.of(async () => {
        await fs.writeFile(outputFilePath, markdownContent, 'utf-8');
        console.log(`Report successfully written to: ${outputFilePath}`);
      });
    })
    .catchError(error => {
      return IO.of(() => {
        console.error(`\n❌ Crawl execution encountered an error:`, error instanceof Error ? error.message : error);
        process.exit(1);
      });
    });

  // Execute the composed IO program
  await crawlProgram.unsafeRun();
}

main();
