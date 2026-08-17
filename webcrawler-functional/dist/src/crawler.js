import { IO } from './io.js';
import { extractValidLinks } from './parser.js';
/**
 * Pure recursive function to crawl child URLs sequentially by threading state.
 */
function crawlChildren(urls, currentDepth, config, state, fetchHtml) {
    // Base case: no more URLs to crawl
    if (urls.length === 0) {
        return IO.pure({ nodes: [], state });
    }
    const [firstUrl, ...restUrls] = urls;
    // Max pages check before initiating next child crawl to optimize
    if (config.maxPages !== undefined && state.pagesCrawled >= config.maxPages) {
        return IO.pure({ nodes: [], state });
    }
    // Crawl the first child
    return crawlUrl(firstUrl, currentDepth, config, state, fetchHtml)
        .flatMap(firstResult => {
        // Recursively crawl the rest of the children using the updated state
        return crawlChildren(restUrls, currentDepth, config, firstResult.state, fetchHtml)
            .map(restResult => ({
            nodes: [firstResult.node, ...restResult.nodes],
            state: restResult.state
        }));
    });
}
/**
 * Pure recursive function to crawl a single URL.
 */
function crawlUrl(url, currentDepth, config, state, fetchHtml) {
    // Guard 1: Check if already visited in this crawl path or globally
    if (state.visited.has(url)) {
        return IO.pure({
            node: {
                url,
                depth: currentDepth,
                outgoingLinks: [],
                children: [],
                error: 'Already visited'
            },
            state
        });
    }
    // Guard 2: Max depth exceeded check
    if (currentDepth > config.maxDepth) {
        return IO.pure({
            node: {
                url,
                depth: currentDepth,
                outgoingLinks: [],
                children: [],
                error: 'Max depth exceeded'
            },
            state
        });
    }
    // Guard 3: Max pages limit exceeded check
    if (config.maxPages !== undefined && state.pagesCrawled >= config.maxPages) {
        return IO.pure({
            node: {
                url,
                depth: currentDepth,
                outgoingLinks: [],
                children: [],
                error: 'Crawl page limit reached'
            },
            state
        });
    }
    // Mark as visited and update state
    const newVisited = new Set(state.visited);
    newVisited.add(url);
    const nextState = {
        visited: newVisited,
        pagesCrawled: state.pagesCrawled + 1
    };
    // Perform fetching and link extraction wrapped inside the IO context
    return fetchHtml(url)
        .map(html => {
        const links = extractValidLinks(html, url);
        return { html, links };
    })
        .flatMap(({ links }) => {
        // If we are at the max depth boundary, we do not visit children recursively
        if (currentDepth === config.maxDepth) {
            const node = {
                url,
                depth: currentDepth,
                outgoingLinks: links,
                children: []
            };
            return IO.pure({ node, state: nextState });
        }
        // Crawl outgoing links recursively
        return crawlChildren(links, currentDepth + 1, config, nextState, fetchHtml)
            .map(childrenResult => {
            const node = {
                url,
                depth: currentDepth,
                outgoingLinks: links,
                children: childrenResult.nodes
            };
            return { node, state: childrenResult.state };
        });
    })
        .catchError(error => {
        // Handle failures gracefully in a purely functional manner
        const errorMsg = error instanceof Error ? error.message : String(error);
        const errorNode = {
            url,
            depth: currentDepth,
            outgoingLinks: [],
            children: [],
            error: errorMsg
        };
        return IO.pure({ node: errorNode, state: nextState });
    });
}
/**
 * Entry point for the purely functional recursive crawler.
 * Returns an IO computation containing the final CrawlNode tree structure.
 */
export function crawl(seedUrl, config, fetchHtml) {
    const initialState = {
        visited: new Set(),
        pagesCrawled: 0
    };
    return crawlUrl(seedUrl, 0, config, initialState, fetchHtml)
        .map(result => result.node);
}
