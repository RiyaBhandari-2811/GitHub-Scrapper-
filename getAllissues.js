const request = require("request");
const cheerio = require("cheerio");
const {getAllTags} = require('./IssuesTags');


function getAllissues(url) {
  // console.log("RepoLink : " + url); // RepoLink : https://github.com/mrdoob/three.js

  request(url, cb);
}

function cb(err, res, body) {
  if (err) {
    console.error("error", err);
  } else {
    Allissues(body);
  }
}

function Allissues(html) {
  let selecTool = cheerio.load(html);
  let issueArr = selecTool("li>#issues-tab");
  // console.log(issueArr.length);

  for (let i = 0; i < issueArr.length; i++) {
    let issueLink = selecTool(issueArr[i]).attr("href");
    let issuefullLink = "https://github.com" + issueLink; //  https://github.com/mrdoob/three.js/issues
    getAllTags(issuefullLink);
    
  }
}

module.exports = {
  getAllissues: getAllissues,
};
