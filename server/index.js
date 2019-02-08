var express = require('express');
var database = require('./database');
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/test', function (req, res) {
  console.log("this is a test");
  res.status(200).send();
});


app.post('/signup', function (req, res) {
   console.log("got a request");
   data = req.body;
   //console.log("data: "+JSON.stringify(data));
   if (data.username.length > 0 && data.password.length > 0 && data.firstname.length > 0 && data.lastname.length > 0
       && data.address.length > 0 && data.email.length > 0 && data.phone.length > 0) {
         if (!database.checkUser(data.username)) {
           console.log('check: '+database.checkUser(data.username));
           database.newUser(data);
           res.status(200).send();
         } else {
           res.status(309).send();
         }
   }
  res.status(400).send();
})

app.listen(3003);
