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
    });
  });
  //con.end();
};

var checkUser = function(username) {
  var con = connect();

  var sql = "SELECT * FROM login WHERE user='"+username+"'";
  return con.query(sql, function (err, result) {
    if (err) throw err
    if (result.length > 0) {
      return true;
    } else {
      return false;
   }
  });
  //return check;
}

module.exports = {newUser, checkUser};
