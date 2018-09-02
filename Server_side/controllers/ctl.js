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
    request('https://elgoog.uk/ajax.php?q=trump&p=1&c=web&la=fr&cc=dz', (err, response, body)=>{
      if(err) {return console.log(err)}
        res.status(200).send(body);
    });
  }else{
    res.status(304).json({Error:'invalid parameters'});
  }
}




