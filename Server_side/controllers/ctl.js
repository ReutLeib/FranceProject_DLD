var HTMLParser = require('node-html-parser');
const request = require('request');



exports.getData = (req,res)=>{
  // console.log("i'm here")
  const googleTrends = require('google-trends-api');

  let resultJson, countCities, finalResults = [], searchCity = "geoName";
  let keywordValue = req.params.keyword;

  googleTrends.interestByRegion({
    keyword: keywordValue,
    startTime: new Date('2018-06-01'),
    endTime: new Date('2018-07-03'),
    resolution: 'CITY',
  })
  .then((results) => {
    console.log("All Good :)");
    // res.json(results.stringify());
    resultJson = JSON.parse(results);
    countCities = Object.keys(resultJson.default.geoMapData).length;
    console.log("resultJson.length: " + countCities)

    for (let i=0 ; i < countCities ; i++){
      console.log("CITY: " + resultJson.default.geoMapData[i][searchCity])
            finalResults.push([resultJson.default.geoMapData[i][searchCity],resultJson.default.geoMapData[i].value]);
    }

    res.json(finalResults);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  })

}



exports.search = (req,res)=>{
  if(req.body.search && req.body.location){
    request(`https://elgoog.uk/ajax.php?q=${req.body.search}&p=1&c=web&cc=${req.body.location}`, (err, response, body)=>{
      if(err) {return console.log(err)}
        // console.log(`myRes = ${response}\nmydata:${body}`);
        var newBo = HTMLParser.parse(body);
        var length = newBo.childNodes.length;
        var result=[];
        filterObjects=i=>{
          if(i<length){
            if(newBo.childNodes[i].classNames[0] === 'result'){
              result.push(newBo.childNodes[i]);
            }
            // result.append(newBo.childNodes.filter(obj=>obj[0] == 'result'));
            filterObjects(++i);
          }else{
            res.status(200).json(result);
          }
        }
        filterObjects(1);
    });
  }else{
    res.status(304).json({Error:'invalid parameters'});
  }
}




