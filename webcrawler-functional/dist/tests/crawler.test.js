import { describe, test } from 'node:test';
import * as assert from 'node:assert';
import { IO } from '../src/io.js';
import { crawl } from '../src/crawler.js';
describe('Recursive Crawler', () => {
    const mockPages = {
        'https://example.com/': `
      <a href="/page1">Page 1</a>
      <a href="/page2">Page 2</a>
    `,
        'https://example.com/page1': `
      <a href="/page3">Page 3</a>
      <a href="/">Back Home</a>
    `,
        'https://example.com/page2': `
      <a href="/page3">Page 3</a>
    `,
        'https://example.com/page3': `
      <p>Leaf node</p>
    `
    };
    const createMockFetcher = () => {
        return (url) => IO.of(() => {
            const html = mockPages[url];
            if (html === undefined) {
                throw new Error(`404 Not Found: ${url}`);
            }
            return html;
        });
    };
    test('should crawl recursively up to maxDepth and track visited URLs to avoid infinite loops', async () => {
        const fetcher = createMockFetcher();
        // Start crawl from example.com with max depth 2
        const resultNode = await crawl('https://example.com/', { maxDepth: 2 }, fetcher).unsafeRun();
        // Check root node
        assert.strictEqual(resultNode.url, 'https://example.com/');
        assert.strictEqual(resultNode.depth, 0);
        assert.strictEqual(resultNode.error, undefined);
        assert.strictEqual(resultNode.children.length, 2);
        // Check page1 child
        const page1Child = resultNode.children.find(c => c.url === 'https://example.com/page1');
        assert.ok(page1Child);
        assert.strictEqual(page1Child.depth, 1);
        assert.strictEqual(page1Child.children.length, 2); // page3 and back-home (which is duplicate)
        // Check duplicate check on back-home
        const backHomeNode = page1Child.children.find(c => c.url === 'https://example.com/');
        assert.ok(backHomeNode);
        assert.strictEqual(backHomeNode.error, 'Already visited');
        assert.strictEqual(backHomeNode.children.length, 0);
        // Check page2 child
        const page2Child = resultNode.children.find(c => c.url === 'https://example.com/page2');
        assert.ok(page2Child);
        assert.strictEqual(page2Child.depth, 1);
        // page3 is visited under page1 first (sequential crawl), so under page2 it should be 'Already visited'
        const page3UnderPage2 = page2Child.children.find(c => c.url === 'https://example.com/page3');
        assert.ok(page3UnderPage2);
        assert.strictEqual(page3UnderPage2.error, 'Already visited');
    });
    test('should respect maxDepth constraint', async () => {
        const fetcher = createMockFetcher();
        // Depth limit 1
        const resultNode = await crawl('https://example.com/', { maxDepth: 1 }, fetcher).unsafeRun();
        assert.strictEqual(resultNode.url, 'https://example.com/');
        assert.strictEqual(resultNode.children.length, 2);
        // Children at depth 1 should have empty children lists, representing they were not recursive crawled
        const page1 = resultNode.children.find(c => c.url === 'https://example.com/page1');
        assert.ok(page1);
        assert.strictEqual(page1.children.length, 0);
        assert.strictEqual(page1.error, undefined);
    });
    test('should respect maxPages limit constraint', async () => {
        const fetcher = createMockFetcher();
        // Limit to max 2 pages crawled
        const resultNode = await crawl('https://example.com/', { maxDepth: 2, maxPages: 2 }, fetcher).unsafeRun();
        // Page 1: https://example.com/ (1)
        // Page 2: https://example.com/page1 (2)
        // After that, page2 crawl should be skipped completely
        const page1 = resultNode.children.find(c => c.url === 'https://example.com/page1');
        const page2 = resultNode.children.find(c => c.url === 'https://example.com/page2');
        assert.ok(page1);
        assert.strictEqual(page2, undefined); // Should be skipped completely once limit is reached
    });
    test('should handle network/fetch failures gracefully', async () => {
        const fetcher = (url) => IO.of(() => {
            throw new Error('Connection refused');
        });
        const resultNode = await crawl('https://example.com/', { maxDepth: 2 }, fetcher).unsafeRun();
        assert.strictEqual(resultNode.url, 'https://example.com/');
        assert.strictEqual(resultNode.error, 'Connection refused');
        assert.strictEqual(resultNode.children.length, 0);
    });
});
