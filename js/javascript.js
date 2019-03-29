$(document).ready(function(){
  showLogoutButton();
});

grecaptcha.ready(function() {
  grecaptcha.execute('6Lfc6poUAAAAAJCbj13WU_XZIMkuC8K12yR_RiwH', {action: 'homepage'}).then(function(token) {
    $("#g-recaptcha-response").val(token);
  });
});

function showLogoutButton() {
  var retrievedObject = sessionStorage.getItem('username');
  if (retrievedObject != undefined && retrievedObject != null) {
    $("#signUpButtonHeader").html(retrievedObject);
    $("#logInButtonHeader").html("Log out");
  }
}

function incrementAmount(element) {
  if (checkAmounts()) {
    count = parseInt(element.innerHTML);
    element.innerHTML = count + 1;
  }
}

function checkAmounts() {
  const max = 10;
  pizzaAmounts = document.getElementsByName("pizzaAmount");
  let totalAmount = 0;

  for (i=0; i<pizzaAmounts.length; i++) {
    totalAmount += parseInt(pizzaAmounts[i].innerHTML);
  }

  return totalAmount < max;
}

function showSignUpForm() {
  var retrievedObject = sessionStorage.getItem('token');
  if (retrievedObject != undefined && retrievedObject != null) return;
  if ($("#orderSentPopup").css("display") != "none") return;
  $("#signUpForm").css("display", "inline-block");
  hideLogInForm();
  hideOrderForm();
}

function hideSignUpForm() {
    $("#signUpForm").css("display", "none");
}

function signUp() {
    if (checkSignUpForm()) {
      username = $("#signUpUsername").val();
      password = $("#signUpPassword").val();
      firstname = $("#signUpFirstName").val();
      lastname = $("#signUpLastName").val();
      address = $("#signUpAddress").val();
      email = $("#signUpEmail").val();
      phone = $("#signUpPhone").val();

      let data=new Object();
      data.username=username;
      data.password=password;
      data.firstname=firstname;
      data.lastname=lastname;
      data.address=address;
      data.email=email;
      data.phone=phone;
      data.captcha = $("#g-recaptcha-response").val();
      let dataStr=JSON.stringify(data);
      console.log("dwdwd "+dataStr);

     /*$.post("http://localhost:3003/signup", dataStr, null, "json")
      .done(function( data ) {
        alert( "Data Loaded: " + data );
      });*/

    $.ajax({
      url: 'http://localhost:3003/signup',
      type: 'post',
      data: dataStr,
      headers: {
          'content-type':'application/json'
      },
      dataType: 'json',
      success: function (data) {
          $('#signUpAlert').html("");
          location.reload();
      },
      error: function (data) {
          statusCode = data.status;
          if (statusCode == 200) {
            $('#signUpAlert').html("");
            location.reload();
          } else if (statusCode == 409) {
            $('#signUpAlert').html("Username is already taken!");
          } else if (statusCode == 400) {
            $('#signUpAlert').html("Invalid data!");
          } else {
            $('#signUpAlert').html("Unknown error: "+statusCode+"!");
          }
      }
    });
    }
}

function checkSignUpForm() {
  usernameField = $("#signUpUsername");
  passwordField = $("#signUpPassword");
  firstnameField = $("#signUpFirstName");
  lastnameField = $("#signUpLastName");
  addressField = $("#signUpAddress");
  emailField = $("#signUpEmail");
  phoneField = $("#signUpPhone");

  correct = true;

  //USERNAME CHECK
  if (usernameField.val().length <= 0) {
    correct = false;
    usernameField.css("color","#ff3f3f");
    usernameField.css("border","1px solid #ff3f3f");
  } else {
    usernameField.css("color","#D2D2D2");
    usernameField.css("border","none");
  }

  //PASSWORD CHECK
  if (passwordField.val().length < 8) {
    correct = false;
    passwordField.css("color","#ff3f3f");
    passwordField.css("border","1px solid #ff3f3f");
  } else {
    passwordField.css("color","#D2D2D2");
    passwordField.css("border","none");
  }

  //FIRST NAME CHECK
  if (firstnameField.val().length <= 0) {
    correct = false;
    firstnameField.css("color","#ff3f3f");
    firstnameField.css("border","1px solid #ff3f3f");
  } else {
    firstnameField.css("color","#D2D2D2");
    firstnameField.css("border","none");
  }

  //LAST NAME CHECK
  if (lastnameField.val().length <= 0) {
    correct = false;
    lastnameField.css("color","#ff3f3f");
    lastnameField.css("border","1px solid #ff3f3f");
  } else {
    lastnameField.css("color","#D2D2D2");
    lastnameField.css("border","none");
  }

  //ADDRESS CHECK
  if (addressField.val().length <= 0) {
    correct = false;
    addressField.css("color","#ff3f3f");
    addressField.css("border","1px solid #ff3f3f");
  } else {
    addressField.css("color","#D2D2D2");
    addressField.css("border","none");
  }

  //EMAIL CHECK
  if (emailField.val().length <= 0 || !emailField.val().match("[^@]+@(([^\.]+\..+)|localhost(:\d+)?)")) {
    correct = false;
    emailField.css("color","#ff3f3f");
    emailField.css("border","1px solid #ff3f3f");
  } else {
    emailField.css("color","#D2D2D2");
    emailField.css("border","none");
  }

  //PHONE NUMBER CHECK
  if (phoneField.val().length <= 0 || !phoneField.val().match("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")) {
    correct = false;
    phoneField.css("color","#ff3f3f");
    phoneField.css("border","1px solid #ff3f3f");
  } else {
    phoneField.css("color","#D2D2D2");
    phoneField.css("border","none");
  }

  return correct;
}

function showLogInForm() {
  if ($("#orderSentPopup").css("display") != "none") return;
  var retrievedObject = sessionStorage.getItem('token');
  if (retrievedObject != undefined && retrievedObject != null) {
    sessionStorage.clear();
    location.reload();
    return;
  }
  $("#logInForm").css("display", "inline-block");
  hideSignUpForm();
  hideOrderForm();
}

function hideLogInForm() {
    $("#logInForm").css("display", "none");
}

function logIn() {
  if (checkLogInForm()) {
    username = $("#logInUsername").val();
    password = $("#logInPassword").val();

    let data=new Object();
    data.username=username;
    data.password=password;
    data.captcha = $("#g-recaptcha-response").val();

    let dataStr = JSON.stringify(data);
    console.log(dataStr);

    $.ajax({
      url: 'http://localhost:3003/login',
      type: 'post',
      data: dataStr,
      headers: {
          'content-type':'application/json'
      },
      dataType: 'json',
      success: function (data) {
          $('#logInAlert').html("");
          sessionStorage.setItem('username', data.username);
          sessionStorage.setItem('token', data.token);
          hideLogInForm();
          hideOrderForm();
          showLogoutButton();
      },
      error: function (data) {
          statusCode = data.status;
          if (statusCode == 200) {
            $('#logInAlert').html("");
          } else if (statusCode == 401) {
            $('#logInAlert').html("Access denied!");
          } else if (statusCode == 400) {
            $('#logInAlert').html("Invalid data!");
          } else {
            $('#signUpAlert').html("Unknown error: "+statusCode+"!");
          }
      }
    });
  }
}

function checkLogInForm() {
  usernameField = $("#logInUsername");
  passwordField = $("#logInPassword");

  correct = true;

  //USERNAME CHECK
  if (usernameField.val().length <= 0) {
    correct = false;
    usernameField.css("color","#ff3f3f");
    usernameField.css("border","1px solid #ff3f3f");
  } else {
    usernameField.css("color","#D2D2D2");
    usernameField.css("border","none");
  }

  //PASSWORD CHECK
  if (passwordField.val().length < 8) {
    correct = false;
    passwordField.css("color","#ff3f3f");
    passwordField.css("border","1px solid #ff3f3f");
  } else {
    passwordField.css("color","#D2D2D2");
    passwordField.css("border","none");
  }

  return correct;
}

function order() {
  var retrievedObject = sessionStorage.getItem('token');
  if ((retrievedObject != undefined && retrievedObject != null) || checkOrderForm()) {
    pizzaAmounts = document.getElementsByName("pizzaAmount");

    let pizzas = [];

    check = false;
    for (i=0; i<pizzaAmounts.length; i++) {
      pizzaAmount = pizzaAmounts[i] ;
      if (pizzaAmount.innerHTML > 0) check = true;
      id = pizzaAmount.id.substr(
      pizzaAmount.id.indexOf("a") + 1,
      pizzaAmount.id.lastIndexOf("a")-pizzaAmount.id.indexOf("a")-1);

      let pizza = new Object();
      pizza.id = id;
      pizza.amount = pizzaAmount.innerHTML;

      pizzas.push(pizza);
    }
    console.log("check: "+check);
    if (!check) return;

    data = new Object();
    data.pizzas = pizzas;
    if (retrievedObject == null || retrievedObject == undefined) {
      data.firstname = $("#orderFirstName").val();
      data.lastname = $("#orderLastName").val();
      data.address = $("#orderAddress").val();
      data.phone = $("#orderPhone").val();
    } else {
      data.token = retrievedObject;
    }
    data.captcha = $("#g-recaptcha-response").val();

    dataStr = JSON.stringify(data);
    console.log(dataStr);

    $.ajax({
      url: 'http://localhost:3003/order',
      type: 'post',
      data: dataStr,
      headers: {
          'content-type':'application/json'
      },
      dataType: 'json',
      error: function (data) {
          statusCode = data.status;
          if (statusCode == 200) {
            showOrderSentPopup();
            $('#orderAlert').html("");
          } else {
            $('#orderAlert').html("An error occured!");
          }
      }
    });
  }
}

function checkOrderForm() {
  firstnameField = $("#orderFirstName");
  lastnameField = $("#orderLastName");
  addressField = $("#orderAddress");
  phoneField = $("#orderPhone");
  correct = true;

  //FIRST NAME CHECK
  if (firstnameField.val().length <= 0) {
    correct = false;
    firstnameField.css("color","#ff3f3f");
    firstnameField.css("border","1px solid #ff3f3f");
  } else {
    firstnameField.css("color","#D2D2D2");
    firstnameField.css("border","none");
  }

  //LAST NAME CHECK
  if (lastnameField.val().length <= 0) {
    correct = false;
    lastnameField.css("color","#ff3f3f");
    lastnameField.css("border","1px solid #ff3f3f");
  } else {
    lastnameField.css("color","#D2D2D2");
    lastnameField.css("border","none");
  }

  //ADDRESS CHECK
  if (addressField.val().length <= 0) {
    correct = false;
    addressField.css("color","#ff3f3f");
    addressField.css("border","1px solid #ff3f3f");
  } else {
    addressField.css("color","#D2D2D2");
    addressField.css("border","none");
  }

  //PHONE NUMBER CHECK
  if (phoneField.val().length <= 0 || !phoneField.val().match("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")) {
    correct = false;
    phoneField.css("color","#ff3f3f");
    phoneField.css("border","1px solid #ff3f3f");
  } else {
    phoneField.css("color","#D2D2D2");
    phoneField.css("border","none");
  }

  return correct;
}

function showOrderForm() {
    if ($("#orderSentPopup").css("display") != "none") return;
    var retrievedObject = sessionStorage.getItem('token');
    if (retrievedObject != undefined && retrievedObject != null) {
      order();
      return;
    }
    $("#orderForm").css("display", "inline-block");
    hideSignUpForm();
    hideLogInForm();
}

function hideOrderForm() {
    $("#orderForm").css("display", "none");
}

function showOrderSentPopup() {
    $("#orderSentPopup").css("display", "inline-block");
    hideSignUpForm();
    hideLogInForm();
    hideOrderForm();

    window.setTimeout(function(){
      hideOrderSentPopup();
      location.reload();
    }, 5000);
}

function hideOrderSentPopup() {
    $("#orderSentPopup").css("display", "none");
}
