function printReport(pages){
  console.log('=====================');
  console.log('Page Report');
  console.log('=====================');
  const sortedPages = sortPages(pages);
  for (const sortedPage of sortedPages){
    const url = sortedPage[0];
    const hists = sortedPage[1];

    console.log(`${url}: ${hists}`)
  }
  console.log('=====================');
  console.log('End Report');
  console.log('=====================');
}


function sortPages(pages){
  const pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => {
    aHist = a[1];
    bHist = b[1];

    return b[1] - a[1];
  })
  return pagesArr;
}


module.exports = {
  sortPages,
  printReport
}