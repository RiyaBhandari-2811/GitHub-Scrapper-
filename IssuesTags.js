// https://github.com/mrdoob/three.js/issues/23803
const request = require("request");
const cheerio = require("cheerio");
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');

function getAllTags(url) {
  // console.log("url : " + url);  // url : https://github.com/mrdoob/three.js/issues
  request(url, cb);
}

function cb(err, res, body) {
  if (err) {
    console.error("error", err);
  } else {
    AllTags(body) ;
  }
}

let AllRepos = path.join(__dirname, "AllRepos");
if (!fs.existsSync(AllRepos)) {
  fs.mkdirSync(AllRepos);
}

function AllTags(html) {
  let selecTool = cheerio.load(html);
  let issueDiv = selecTool(".flex-auto.min-width-0.p-2.pr-3.pr-md-2");
  let issueLink = selecTool(".flex-auto.min-width-0.p-2.pr-3.pr-md-2>a");
  let repoName = selecTool(".url.fn");
  let finalPath = path.join(__dirname,"AllRepos",repoName.text()+".pdf");
  console.log(finalPath);
  // console.log( "   Repo Name   <<<    "+ repoName.text() + "    >>> \n");
  let fileText = [];
  for (let i = 0; i < issueDiv.length ; i++) {
    let spanPresentOrNot = selecTool(issueDiv[i]).find(".flex-auto.min-width-0.p-2.pr-3.pr-md-2>.lh-default.d-block.d-md-inline");
    if(spanPresentOrNot){
      let tagsArr = selecTool(spanPresentOrNot).find("a[data-name]");
      if(tagsArr != ""){
        fileText.push({Title :selecTool(issueLink[i]).text() , Link :("https://github.com" + selecTool(issueLink[i]).attr("href")) ,Tags : tagsArr.text() }) ;
      }else{
        fileText.push({Title :selecTool(issueLink[i]).text() , Link :("https://github.com" + selecTool(issueLink[i]).attr("href")) , Tags  : "No Tags"}) ;
      }
 
    let pdfDoc  = new PDFDocument({size: 'A4'});
    pdfDoc.pipe(fs.createWriteStream(finalPath));
    pdfDoc.text(JSON.stringify(fileText),{ align: 'center'});
    pdfDoc.moveDown(0.5);
    pdfDoc.end();

    }
      
  }

}

module.exports = {
    getAllTags : getAllTags
}

