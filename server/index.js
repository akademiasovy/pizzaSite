var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/signup', function (req, res) {
  console.log(req.body);
   data = req.body;
   if (data.username.length > 0 && data.password.length > 0 && data.firstname.length > 0 && data.lastname.length > 0
       && data.address.length > 0 && data.email.length > 0 && data.phone.length > 0) {
         console.log('OK');
   }
})
app.listen(3000);
