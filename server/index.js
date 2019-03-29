var express = require('express');
var Recaptcha = require('recaptcha-verify');
var recaptcha = new Recaptcha({
    secret: '6Lfc6poUAAAAANgpsKTNAQExViOqWoCrOcmbstqZ',
    verbose: true
});
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
  checkCaptcha(req, function(captchaCheck) {
    if (!captchaCheck) {
      res.status(401).send();
      return;
    }
   console.log("got a request");
   data = req.body;
   //console.log("data: "+JSON.stringify(data));
   if (data.username.length > 0 && data.password.length > 0 && data.firstname.length > 0 && data.lastname.length > 0
       && data.address.length > 0 && data.email.length > 0 && data.phone.length > 0) {
         database.checkUser(data.username, function(userExists) {
           if (!userExists) {
              database.newUser(data);
              res.status(200).send();
           } else {
              res.status(409).send();
           }
         });
   } else {
     res.status(400).send();
   }
 });
});

app.post('/login', function (req, res) {
   checkCaptcha(req, function(captchaCheck) {
     if (!captchaCheck) {
       res.status(401).send();
       return;
     }
     console.log("got a request");
     data = req.body;
     console.log("recaptcha: "+data.captcha);
     //console.log("data: "+JSON.stringify(data));
     if (data.username.length > 0 && data.password.length > 0) {
        database.authenticate(data.username,data.password,function(token) {
          console.log("idk123: "+token);
          if (token!==null) {
            tokenObject = new Object();
            tokenObject.username = data.username;
            tokenObject.token = token;
            res.status(200).send(JSON.stringify(tokenObject));
          } else {
            res.status(401).send();
          }
        });
     } else {
       res.status(400).send();
     }
   });
});

app.post('/order', function (req, res) {
  data = req.body;
  checkCaptcha(req, function(captchaCheck) {
    if (!data.hasOwnProperty("token") && !captchaCheck) {
      res.status(401).send();
      return;
    }
   if (data.hasOwnProperty("token")) {
      database.getLoggedInUser(data.token, function(user) {
        console.log("user: "+user);
        if (user != null && user != undefined) {
          database.order(user.firstname, user.lastname, user.address, user.phone, JSON.stringify(data.pizzas));
          console.log("tusa massss dostat");
          res.status(200).send();
        } else {
          console.log("tusa nema dostat");
          res.status(401).send();
        }
      });
   } else if (data.firstname.length > 0 && data.lastname.length > 0 && data.address.length > 0 && data.phone.length > 0  && data.pizzas.length > 0) {
      database.order(data.firstname, data.lastname, data.address, data.phone, JSON.stringify(data.pizzas));
      res.status(200).send();
   } else {
      res.status(400).send();
   }
 });
});

function checkCaptcha(req, callback) {
  console.log("captcha failed");
  data = req.body;
  recaptcha.checkResponse(data.captcha, function(error, response){
        if(error){
          callback(false);
          return;
        }
        if(response.success){
          callback(true);
          return;
        }else{
          callback(false);
          return;
        }
    });
}

app.listen(3003);
