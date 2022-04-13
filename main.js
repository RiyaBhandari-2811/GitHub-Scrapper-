const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const { getAllsubtopic } = require("./subtopic");
let url = "https://github.com/topics/";


request(url, cb);

function cb(err, res, body) {
  if (err) {
    console.error("error", err);
  } else {
    handleHtml(body);
  }
}

let AllRepos = path.join(__dirname, "AllRepos");
if (!fs.existsSync(AllRepos)) {
  fs.mkdirSync(AllRepos);
}

function handleHtml(html) {
  let selecTool = cheerio.load(html);

  let topicsList = selecTool(".no-underline.flex-1.d-flex.flex-column");

  for (let i = 0; i < 3; i++) {
    let relativeLink = selecTool(topicsList[i]).attr("href");
    // console.log(relativeLink); // https://github.com/topics/3d
    let fullLink = "https://github.com" + relativeLink;

  
    getAllsubtopic(fullLink);
  
  }
}

