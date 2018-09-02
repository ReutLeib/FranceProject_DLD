var   express         = require('express'),
      ctl             = require('./controllers/ctl.js'),
      app             = express(),
      port            = process.env.PORT || 8080;
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port',port);

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept");
    next();
});

app.get('/getData/:keyword',  ctl.getData);  // value : userName
app.post('/search',ctl.search);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
