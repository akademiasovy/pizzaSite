var mysql = require('mysql');
var crypto = require('crypto');

function connect() {
  con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "pizzasite"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connection to database has been established!");
  });

  return con;
}

var newUser = function (data) {
  var con = connect();

  const secret = 'abcdefg';
  const passwordHash = crypto.createHmac('sha512', secret).update(data.password).digest('hex');

  var sql = "INSERT INTO login (user, passhash) VALUES (\""+data.username+"\", \""+passwordHash+"\");";
  con.query(sql, function (err, result) {
    if (err) throw err;
    var sql = "INSERT INTO user "+
              "(loginid, firstname, lastname, email, phone, address) VALUES "+
              "("+result.insertId+", \""+data.firstname+"\", \""+data.lastname+"\", \""+data.email+"\","+
              "\""+data.phone+"\", \""+data.address+"\");";
    /*console.log(sql);
    console.log(con);*/
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("New user created!");
      con.end();
    });
  });
  //con.end();
};

var checkUser = function(username) {
  var con = connect();

  var sql = "SELECT * FROM login WHERE user='"+username+"'";

  return Boolean(con.query(sql, function (err, result) {
    //console.log(result.length);
    if (err) throw err;
    con.end();
    if (result.length > 0) {
      return true;
    } else {
      return false;
   }
 }));
  //return check;
}

var tokens = [];

var authenticate = function(username, password) {
  var con = connect();

  const secret = 'abcdefg';
  const passwordHash = crypto.createHmac('sha512', secret).update(data.password).digest('hex');
  var sql = "SELECT * FROM login WHERE user='"+username+"' and passhash='"+passwordHash+"'";

  return con.query(sql, function (err, result) {
    var token = undefined;

    if (result.length > 0) {
      try {
      tokens.forEach(function(savedToken) {
        if (savedToken.username == username) {
          token = savedToken.data;
          throw new BreakException();
        }
      });
    } catch(e) {
      
    }

    if (token == undefined) {
      token = '';
      while (token.length < 32) {
        token = token + String.fromCharCode(97+Math.random()*25);
      }
      tokenObject = new Object();
      tokenObject.username = username;
      tokenObject.data = token;
      //tokens[tokens.length] = JSON.stringify(tokenObject);
      tokens=[...tokens, tokenObject];
      console.log(tokens);
    }

    } else {
      return false;
    }
 });
};

module.exports = {newUser, checkUser, authenticate};
