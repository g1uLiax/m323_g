import { describe, test } from 'node:test';
import * as assert from 'node:assert';
import { extractRawUrls, resolveAndNormalizeUrl, extractValidLinks } from '../src/parser.js';

describe('URL Parser', () => {
  test('extractRawUrls should find all href attributes in HTML anchor tags', () => {
    const html = `
      <html>
        <body>
          <a href="https://example.com/page1">Page 1</a>
          <div>Some text</div>
          <a class="btn" href="/relative/path">Relative</a>
          <a href='http://example.org/page2'>Single quotes</a>
          <a href="mailto:info@example.com">Email</a>
        </body>
      </html>
    `;
    
    const results = extractRawUrls(html);
    assert.deepStrictEqual(results, [
      'https://example.com/page1',
      '/relative/path',
      'http://example.org/page2',
      'mailto:info@example.com'
    ]);
  });

  test('resolveAndNormalizeUrl should resolve relative paths against base URL', () => {
    const base = 'https://example.com/docs/index.html';
    
    assert.strictEqual(
      resolveAndNormalizeUrl('page2.html', base),
      'https://example.com/docs/page2.html'
    );
    
    assert.strictEqual(
      resolveAndNormalizeUrl('/global.css', base),
      'https://example.com/global.css'
    );
    
    assert.strictEqual(
      resolveAndNormalizeUrl('../images/logo.png', base),
      'https://example.com/images/logo.png'
    );
  });

  test('resolveAndNormalizeUrl should ignore non-http/https protocols', () => {
    const base = 'https://example.com';
    
    assert.strictEqual(resolveAndNormalizeUrl('mailto:test@example.com', base), null);
    assert.strictEqual(resolveAndNormalizeUrl('javascript:void(0)', base), null);
    assert.strictEqual(resolveAndNormalizeUrl('tel:+410000000', base), null);
  });

  test('resolveAndNormalizeUrl should strip URL fragments', () => {
    const base = 'https://example.com';
    
    assert.strictEqual(
      resolveAndNormalizeUrl('http://example.org/home#section-header', base),
      'http://example.org/home'
    );
    assert.strictEqual(
      resolveAndNormalizeUrl('/about#team', base),
      'https://example.com/about'
    );
  });

  test('extractValidLinks should extract and unique resolve only http/https links', () => {
    const html = `
      <a href="/about">About</a>
      <a href="/about">Duplicate About</a>
      <a href="https://other.com/home">External</a>
      <a href="mailto:contact@test.com">Mailto</a>
    `;
    const base = 'https://example.com';
    
    const results = extractValidLinks(html, base);
    assert.deepStrictEqual(results, [
      'https://example.com/about',
      'https://other.com/home'
    ]);
  });
});
