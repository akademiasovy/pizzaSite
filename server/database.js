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
      return;
    });
  });
  //con.end();
};

var checkUser = function(username, callback) {
  var con = connect();

  var sql = "SELECT * FROM login WHERE user='"+username+"'";

  con.query(sql, function (err, result) {
    //console.log(result.length);
    if (err) throw err;
    con.end();
    callback(result.length > 0);
    return;
 });
}

var tokens = [];

var authenticate = function(username, password, callback) {
  var con = connect();

  const secret = 'abcdefg';
  const passwordHash = crypto.createHmac('sha512', secret).update(data.password).digest('hex');
  var sql = "SELECT * FROM login WHERE user='"+username+"' and passhash='"+passwordHash+"'";

  var token = undefined;
  con.query(sql, function (err, result) {
    if (result.length > 0) {
      //console.log('found user')
      tokens.forEach(function(savedToken) {
        if (savedToken.username == username) {
          token = savedToken.data;
          callback(token);
          //con.end();
          return;
        }
      });

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
        //console.log(tokens);
        callback(token);
        return;
      }
    }
    callback(null);
 });
 con.end();
};

var getLoggedInUser = function(token, callback) {
  var foundUser = false;
  var con = connect();

  tokens.forEach(function(savedToken) {
    if (savedToken.data === token) {
         //INNER JOIN login ON user.loginid = login.id WHERE login.user LIKE '"+token.username+"'
      //var sql = "SELECT user.firstname, user.lastname, user.email, user.phone, user.address, user.loginid FROM user, login WHERE user.loginid = login.id AND login.user LIKE '"+token.username+"'";
      var sql = "SELECT user.firstname, user.lastname, user.email, user.phone, user.address FROM user INNER JOIN login ON user.loginid = login.id WHERE login.user='"+savedToken.username+"'"
      con.query(sql, function (err, result) {
          if (err) throw err;
          //console.log("result="+result);
          if (result != null && result != undefined && result.length > 0) {
            //console.log("got result!!!!!!");
            foundUser = true;
            user = new Object();
            user.firstname = result[0].firstname;
            user.lastname = result[0].lastname;
            user.email = result[0].email;
            user.phone = result[0].phone;
            user.address = result[0].address;
            user.token = token;
            callback(user);
            return;
          }
      });
    }
  });
  //if (!foundUser) callback(null);
  con.end();
};

var order = function(firstname, lastname, address, phone, pizzas) {
  var con = connect();

  var sql = "INSERT INTO orders (firstname, lastname, address, phone, pizzas) VALUES ('"+firstname+"', '"+lastname+"', '"+address+"', '"+phone+"', '"+pizzas+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("order sent!");
  });
  con.end();
};

module.exports = {newUser, checkUser, authenticate, getLoggedInUser, order};
