<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="./css/style.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="./js/javascript.js"></script>

  <meta http-equiv="cache-control" content="no-cache"/>
  <meta http-equiv="expires" content="0"/>
  <meta http-equiv="pragma" content="no-cache"/>
</head>
<body>
  <div class="container mainContainer">
    <div class="row header">
      <div class="col-md-8 textHeader">
	  <h2>Pizzasite</h2>
      </div>
      <div class="col-md-2 headerBtn" onclick="showSignUpForm()">
          <h3>Sign up</h3>
      </div>
      <div class="col-md-2 headerBtn" onclick="showLogInForm()">
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
            $html=$html."Add to cart <p name=\"pizzaAmount\" id=\"pizza".$row["id"]."amount\">0</p>";
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
      <div class="col-md-4 orderBtn" onclick="showOrderForm()">
	       Order
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>

  <div id="signUpForm" class="popupForm">
    <h1>Sign up</h1><br><br><br>
    <input id="signUpUsername" type="text" placeholder="Username"><br><br>
    <input id="signUpPassword" type="password" placeholder="Password"><br><br>
    <input id="signUpFirstName" type="text" placeholder="First Name"><br><br>
    <input id="signUpLastName" type="text" placeholder="Last Name"><br><br>
    <input id="signUpAddress" type="text" placeholder="Address"><br><br>
    <input id="signUpEmail" type="text" placeholder="E-mail"><br><br>
    <input id="signUpPhone" type="text" placeholder="Phone number"><br><br>
    <div id="signUpAlert" class="alert"></div><br><br>
    <br>
    <button id="btnSignUp" onclick="signUp()">Sign up</button><br><br>
    <button id="btnCancelSignUp" onclick="hideSignUpForm()">Cancel</button>
  </div>

 <div id="logInForm" class="popupForm">
    <h1>Log in</h1><br><br><br>
    <input id="logInUsername" type="text" placeholder="Username"><br><br>
    <input id="logInPassword" type="password" placeholder="Password"><br><br><br><br>
    <br>
    <button id="btnSignUp" onclick="logIn()">Log in</button><br><br>
    <button id="btnCancelLogIn" onclick="hideLogInForm()">Cancel</button>
 </div>

 <div id="orderForm" class="popupForm">
    <h1>Order details</h1><br><br><br>
    <input id="orderFirstName" type="text" placeholder="First Name"><br><br>
    <input id="orderLastName" type="text" placeholder="Last Name"><br><br>
    <input id="orderAddress" type="text" placeholder="Address"><br><br>
    <input id="orderPhone" type="text" placeholder="Phone Number"><br><br><br><br>
    <br>
    <button id="btnSendOrder" onclick="order()">Order</button><br><br>
    <button id="btnCancelOrder" onclick="hideOrderForm()">Cancel</button>
 </div>

</body>
</html>
