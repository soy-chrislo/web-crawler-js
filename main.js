const { crawlPage } = require('./crawl.js');


async function main(){
  checkArguments();

  console.log('Starting craw');

  const baseURL = process.argv[2];
  console.log(`Base URL: ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});
  for (const page in pages){
    console.log(`${page}: ${pages[page]}`);
  }
}


function checkArguments(){
  if (process.argv.length < 3){
    console.error('No website URL provided');
    process.exit(1);
  }
  if (process.argv.length > 3){
    console.error('Too many arguments');
    process.exit(1);
  }
}

main();