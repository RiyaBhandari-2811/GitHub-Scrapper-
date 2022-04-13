const request = require("request");
const cheerio = require("cheerio");
const {getAllissues} = require("./getAllissues");




function getAllsubtopic (url) {
    // console.log( "subtopic : " + url);
  request(url, cb);
}


function cb(err, res, body) {
  if (err) {
    console.error("error", err);
  } else {
    Allsubtopic(body);
  }
}

function Allsubtopic(html) {
  let selecTool = cheerio.load(html);
  let SubTopicArr = selecTool('h3 a:last-child');
//   console.log(SubTopicArr.length);

  for(let i=0 ; i<3 ; i++){
      let SubTopicLink = selecTool(SubTopicArr[i]).attr("href");
      let fullLink = "https://github.com" + SubTopicLink ;  //  https://github.com/mrdoob/three.js
      getAllissues(fullLink);
  }

}

module.exports = {
  getAllsubtopic: getAllsubtopic,
};
