<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="./css/style.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="./js/javascript.js">
  signUp();</script>
</head>
<body>
  <div class="container mainContainer">
    <div class="row header">
      <div class="col-md-8 textHeader">
	  <h2 onclick="signUp78()">Pizzasite</h2>
      </div>
      <div class="col-md-2 headerBtn" onclick="showSignUpForm()">
          <h3>Sign up</h3>
      </div>
      <div class="col-md-2 headerBtn">
          <h3>Log in</h3>
      </div>
    </div>

    <div class="row">
      <br><br><br>
      <?php
        require 'config.php';

        $conn = mysqli_connect($servername, $username, $password, $dbname);
        if (!$conn) {
          die("Connection failed: " . mysqli_connect_error());
        }

        $sql="select * from pizza ";
        $sql=$sql."inner join availablepizza ";
        $sql=$sql."on pizza.id=availablepizza.pizzaid ";
        $sql=$sql."where available=1;";
        $result=mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
          $html="<div style=\"width: 100%;\">";
          $count=0;
          while($row = mysqli_fetch_assoc($result)) {

            if ($count==0) {
              $html=$html."<div class=\"row\">";
            }

            $html=$html."<div class=\"col-md-4 pizzaContainer\">";
            $html=$html."<img src=\"images/".$row["imagePath"]."\">";
            $html=$html."<br><br>";
            $html=$html."<p>".$row["name"]."</p>";
            $html=$html."<p>$".$row["price"]."</p>";
            $html=$html."<br>";
            $html=$html."<div class=\"addToCartBtn\" onclick=\"incrementAmount(pizza".$row["id"]."amount);\">";
            $html=$html."Add to cart <p id=\"pizza".$row["id"]."amount\">0</p>";
            $html=$html."</div>";
            $html=$html."</div>";

            if ($count==2) {
              $html=$html."</div><br>";
              $count=0;
            } else {
              $count++;
            }
          }
          $html=$html."</div>";
          echo $html;
        } else {
          $html="<div class=\"row\">";
          $html=$html."<div class=\"col-md-12 alert\">";
          $html=$html."No pizzas are currently in stock! Please come back later!";
          $html=$html."</div>";
          $html=$html."</div>";
          echo $html;
        }
      ?>
    </div>

    <div class="row">
      <br><br><br>
    </div>

    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4 orderBtn">
	Order
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>

  <div id="signUpForm" class="signUpForm">
    <input id="signUpUsername" type="text" placeholder="Username"><br>
    <input id="signUpPassword" type="password" placeholder="Password"><br>
    <input id="signUpFirstName" type="text" placeholder="First Name"><br>
    <input id="signUpLastName" type="text" placeholder="Last Name"><br>
    <input id="signUpAddress" type="text" placeholder="Address"><br>
    <input id="signUpEmail" type="text" placeholder="E-mail"><br>
    <input id="signUpPhone" type="text" placeholder="Phone number"><br>
    <button id="btnSignUp">Sign up</button>
</body>
</html>
