var express = require('express');
var app = express();



app.post('/test', function (req, res) {
  console.log("this is a test");
  res.status(200).send();
});

app.listen(3001);
