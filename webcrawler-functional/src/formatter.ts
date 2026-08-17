import { CrawlNode } from './crawler.js';

/**
 * Pure function to format the hierarchical CrawlNode tree structure
 * into an indented Markdown list representation.
 */
function formatTreeRepresentation(node: CrawlNode, indent: string = ''): string {
  const suffix = node.error ? ` *(Error: ${node.error})*` : '';
  const currentLine = `${indent}- **${node.url}**${suffix}\n`;
  
  const childrenLines = node.children
    .map(child => formatTreeRepresentation(child, indent + '  '))
    .join('');
    
  return currentLine + childrenLines;
}

/**
 * Pure function to recursively collect all unique successfully crawled pages
 * and their outgoing links.
 */
function collectVisitedPages(node: CrawlNode): readonly CrawlNode[] {
  // Ignore nodes that were skipped due to already being visited or exceeding depth/limit errors
  const isActualCrawl = !node.error || (node.error !== 'Already visited' && node.error !== 'Max depth exceeded' && node.error !== 'Crawl page limit reached');
  const current = isActualCrawl ? [node] : [];
  
  const childrenPages = node.children.flatMap(collectVisitedPages);
  
  // Combine and deduplicate by URL to ensure each page is only listed once in details
  const all = [...current, ...childrenPages];
  const seen = new Set<string>();
  const unique: CrawlNode[] = [];
  
  for (const item of all) {
    if (!seen.has(item.url)) {
      seen.add(item.url);
      unique.push(item);
    }
  }
  
  return Object.freeze(unique);
}

/**
 * Pure function to format the list of visited pages and their outgoing links.
 */
function formatDetailsRepresentation(nodes: readonly CrawlNode[]): string {
  if (nodes.length === 0) {
    return '*No pages crawled successfully.*';
  }

  return nodes.map(node => {
    const errorSection = node.error ? `\n> [!WARNING]\n> Page loaded with error: **${node.error}**\n` : '';
    const linksList = node.outgoingLinks.length > 0
      ? node.outgoingLinks.map(link => `  - [${link}](${link})`).join('\n')
      : '  *(None)*';
      
    return `### Page: [${node.url}](${node.url})
- **Depth**: ${node.depth}
- **Status**: ${node.error ? '⚠️ Failed' : '✅ Success'}
- **Outgoing Links (${node.outgoingLinks.length} total)**:
${linksList}
${errorSection}`;
  }).join('\n\n');
}

/**
 * Pure function to combine tree structure and detail lists into a final Markdown report.
 */
export function formatCrawlResult(root: CrawlNode, seedUrl: string, maxDepth: number, maxPages?: number): string {
  const timestamp = new Date().toISOString();
  const treeSection = formatTreeRepresentation(root);
  const crawledPages = collectVisitedPages(root);
  const detailsSection = formatDetailsRepresentation(crawledPages);
  
  return `# Web Crawler Report

- **Seed URL**: [${seedUrl}](${seedUrl})
- **Max Crawl Depth**: ${maxDepth}
- **Max Pages Limit**: ${maxPages !== undefined ? maxPages : 'None'}
- **Crawl Timestamp**: ${timestamp}
- **Total Unique Pages Crawled**: ${crawledPages.length}

---

## 🌳 Crawl Tree Structure

The structure below shows the recursive discovery path of pages up to depth ${maxDepth}:

${treeSection}

---

## 🔗 Outgoing Links Details

Detailed overview of all visited pages and their extracted outgoing hyperlinks:

${detailsSection}
`;
}
