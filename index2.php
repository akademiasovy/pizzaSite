<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="./css/style.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script>
     function incrementAmount(element) {
	count = parseInt(element.innerHTML);
	element.innerHTML = count+1;
     }
  </script>
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
      <div class="col-md-2 headerBtn">
          <h3>Sign in</h3>
      </div>
    </div>

    <div class="row">
      <br><br><br>
          <div style="width: 100%;">
              <div class="row">
                  <div class="col-md-4 pizzaContainer">
		      <img src="./images/pepperoni.png">
		      <br><br>
            	      <p>Pepperoni pizza</p>
                      <p>$5.99</p>
	              <br>
	              <div class="addToCartBtn" onclick="incrementAmount(pizza0amount);">
                      	Add to cart <p id="pizza0amount">0</p>
		      </div>
                  </div>

   		  <div class="col-md-4 pizzaContainer">
		      <img src="./images/ham.png">
		      <br><br>
            	      <p>Ham pizza</p>
                      <p>$5.49</p>
	              <br>
	              <div class="addToCartBtn" onclick="incrementAmount(pizza1amount);">
                      	Add to cart <p id="pizza1amount">0</p>
		      </div>
                  </div>

                  <div class="col-md-4 pizzaContainer">
            	      <img src="./images/cheese.png">
		      <br><br>
            	      <p>Cheese pizza</p>
                      <p>$4.99</p>
	              <br>
	              <div class="addToCartBtn" onclick="incrementAmount(pizza2amount);">
                      	Add to cart <p id="pizza2amount">0</p>
		      </div>
                  </div>
              </div><br>
          </div>
    </div>

    <div class="row">
      <br><br><br>
    </div>

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
        $totalCount=0;
        $count=0;
        while($row = mysqli_fetch_assoc($result)) {
          if ($count==0) {
            $html=$html."<div class=\"row\">";
          }

          $html=$html."<div class=\"col-md-4 pizzaContainer\">";
          $html=$html."<p>".$row["name"]."</p>";
          $html=$html."<br>";
          $html=$html."<p>Price: $".$row["price"]."</p>";
          $html=$html."</div>";

          if ($count==2) {
            $html=$html."</div><br>";
            $count=0;
          } else {
            $count++;
          }
          $totalCount++;
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

    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4 orderBtn">
	Order
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</body>
</html>
