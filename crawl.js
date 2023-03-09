const { JSDOM } = require('jsdom');

async function crawlPage(baseURL, currentURL, pages){
  
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname){
    console.log(`Skipping: ${currentURL}, not on same host as base URL`);
    return pages;
  }
  
  const normalizedCurrentURL = normalizeUrl(currentURL);
  if (pages[normalizedCurrentURL] > 0){
    pages[normalizedCurrentURL] += 1;
    console.log(`Skipping: ${currentURL}, already crawled`);
    return pages;
  }

  pages[normalizedCurrentURL] = 1;  
  console.log(`Crawling: ${currentURL}`);


  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399){
      console.error(`Error fetching URL: ${currentURL}, status: ${resp.status}`);
      return pages;
    }
    const contentType = resp.headers.get('content-type');
    if (!(contentType.includes('text/html'))){
      console.error(`Error fetching URL: ${currentURL}, content-type: ${contentType}, expected: text/html`);
      return pages; 
    }

    const htmlBody = await resp.text();

    nextURLs = getURLsFromHTML(htmlBody, baseURL);

    for (const nextURL of nextURLs){
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (e) {
    console.error(`Error fetching URL: ${currentURL}, reason: ${e.message}`);
  }
  return pages;
}


function getURLsFromHTML(htmlBody, baseURL){
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a');
  for (const linkElement of linkElements){
    if (linkElement.href.slice(0, 1) === '/'){
      // relative path
      try {
        urls.push(new URL(linkElement.href, baseURL).href);
      } catch (e) {
        console.error(`Invalid relative URL: ${linkElement.href}`);
      }
    } else {
      // absolute path
      try {
        urls.push(new URL(linkElement.href).href);
      } catch (e) {
        console.error(`Invalid absolute URL: ${linkElement.href}`);
      }
    }
  }

  return urls;
}


function normalizeUrl(urlString){
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeUrl,
  getURLsFromHTML,
  crawlPage,
}