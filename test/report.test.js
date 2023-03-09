const { sortPages } = require('../src/report.js');
const { test, expect } = require('@jest/globals');

test('sortPages 2 pages', () => {
  const input = {
    'https://soychristian.com/path': 1,
    'https://soychristian.com': 3
  };
  const actual = sortPages(input);
  const expected = [
    ['https://soychristian.com', 3],
    ['https://soychristian.com/path', 1]
  ];

  expect(actual).toEqual(expected);
})

test('sortPages 5 pages', () => {
  const input = {
    'https://soychristian.com/path': 1,
    'https://soychristian.com': 3,
    'https://soychristian.com/path2': 5,
    'https://soychristian.com/path3': 2,
    'https://soychristian.com/path4': 9,
  };
  const actual = sortPages(input);
  const expected = [
    ['https://soychristian.com/path4', 9],
    ['https://soychristian.com/path2', 5],
    ['https://soychristian.com', 3],
    ['https://soychristian.com/path3', 2],
    ['https://soychristian.com/path', 1]
  ];

  expect(actual).toEqual(expected);
})