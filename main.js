const { crawlPage } = require('./src/crawl.js');
const { printReport } = require('./src/report.js');


async function main(){
  validateArguments();

  console.log('Starting craw');

  const baseURL = process.argv[2];
  console.log(`Base URL: ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});
  printReport(pages);
}


function validateArguments(){
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