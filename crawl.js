const { JSDOM } = require('jsdom');

async function crawlPage(currentURL){
  console.log(`Crawling: ${currentURL}`);

  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399){
      console.error(`Error fetching URL: ${currentURL}, status: ${resp.status}`);
      return;
    }
    const contentType = resp.headers.get('content-type');
    if (contentType.includes('text/html')){
      console.error(`Error fetching URL: ${currentURL}, content-type: ${contentType}, expected: text/html`);
      return; 
    }

    console.log(await resp.text());
  } catch (e) {
    console.error(`Error fetching URL: ${currentURL}, reason: ${e.message}`);
  }
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