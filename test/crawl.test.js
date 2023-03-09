const { normalizeUrl, getURLsFromHTML } = require('../src/crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeUrl strip protocol', () => {
  const input = 'https://sandbox.soychristian.com/path';
  const actual = normalizeUrl(input);
  const expected = 'sandbox.soychristian.com/path';

  expect(actual).toEqual(expected);
})

test('normalizeUrl strip trailing slash', () => {
  const input = 'https://sandbox.soychristian.com/path/';
  const actual = normalizeUrl(input);
  const expected = 'sandbox.soychristian.com/path';

  expect(actual).toEqual(expected);
})

test('normalizeUrl capitals', () => {
  const input = 'https://SANDBOX.soychristian.com/path/';
  const actual = normalizeUrl(input);
  const expected = 'sandbox.soychristian.com/path';

  expect(actual).toEqual(expected);
})

test('normalizeUrl strip http', () => {
  const input = 'http://sandbox.soychristian.com/path/';
  const actual = normalizeUrl(input);
  const expected = 'sandbox.soychristian.com/path';

  expect(actual).toEqual(expected);
})

test('getURLsFromHTML absolute', () => {
  const inputHTMLBody = `
    <html>
      <body>
        <a href="http://sandbox.soychristian.com/path/">
          Boot.dev Blog
        </a>
      </body>
    </html>
  `;
  const inputBaseURL = 'http://sandbox.soychristian.com/path/';
  const actual = getURLsFromHTML(inputHTMLBody ,inputBaseURL);
  const expected = ['http://sandbox.soychristian.com/path/'];

  expect(actual).toEqual(expected);
})


test('getURLsFromHTML relative', () => {
  const inputHTMLBody = `
    <html>
      <body>
        <a href="/path/">
          Boot.dev Blog
        </a>
      </body>
    </html>
  `;
  const inputBaseURL = 'http://sandbox.soychristian.com';
  const actual = getURLsFromHTML(inputHTMLBody ,inputBaseURL);
  const expected = ['http://sandbox.soychristian.com/path/'];

  expect(actual).toEqual(expected);
})



test('getURLsFromHTML both', () => {
  const inputHTMLBody = `
    <html>
      <body>
        <a href="http://sandbox.soychristian.com/path1/">
          Boot.dev Blog Path One
        </a>
        <a href="/path2/">
          Boot.dev Blog Path Two
        </a>
      </body>
    </html>
  `;
  const inputBaseURL = 'http://sandbox.soychristian.com';
  const actual = getURLsFromHTML(inputHTMLBody ,inputBaseURL);
  const expected = ["http://sandbox.soychristian.com/path1/", "http://sandbox.soychristian.com/path2/"];

  expect(actual).toEqual(expected);
})


test('getURLsFromHTML invalid', () => {
  const inputHTMLBody = `
    <html>
      <body>
        <a href="invalid">
          Invalid URL
        </a>
      </body>
    </html>
  `;
  const inputBaseURL = 'http://sandbox.soychristian.com';
  const actual = getURLsFromHTML(inputHTMLBody ,inputBaseURL);
  const expected = [];

  expect(actual).toEqual(expected);
})