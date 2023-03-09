const { JSDOM } = require('jsdom');

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
  getURLsFromHTML
}