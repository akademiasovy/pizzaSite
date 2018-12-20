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
      let dataStr=JSON.stringify(data);
      console.log(dataStr);
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
    usernameField.css("color","#DD1111");
    usernameField.css("border","1px solid #DD1111");
  } else {
    usernameField.css("color","#D2D2D2");
    usernameField.css("border","none");
  }

  //PASSWORD CHECK
  if (passwordField.val().length < 8) {
    correct = false;
    passwordField.css("color","#DD1111");
    passwordField.css("border","1px solid #DD1111");
  } else {
    passwordField.css("color","#D2D2D2");
    passwordField.css("border","none");
  }

  //FIRST NAME CHECK
  if (firstnameField.val().length <= 0) {
    correct = false;
    firstnameField.css("color","#DD1111");
    firstnameField.css("border","1px solid #DD1111");
  } else {
    firstnameField.css("color","#D2D2D2");
    firstnameField.css("border","none");
  }

  //LAST NAME CHECK
  if (lastnameField.val().length <= 0) {
    correct = false;
    lastnameField.css("color","#DD1111");
    lastnameField.css("border","1px solid #DD1111");
  } else {
    lastnameField.css("color","#D2D2D2");
    lastnameField.css("border","none");
  }

  //ADDRESS CHECK
  if (addressField.val().length <= 0) {
    correct = false;
    addressField.css("color","#DD1111");
    addressField.css("border","1px solid #DD1111");
  } else {
    addressField.css("color","#D2D2D2");
    addressField.css("border","none");
  }

  //EMAIL CHECK
  if (emailField.val().length <= 0 || !emailField.val().match("[^@]+@(([^\.]+\..+)|localhost(:\d+)?)")) {
    correct = false;
    emailField.css("color","#DD1111");
    emailField.css("border","1px solid #DD1111");
  } else {
    emailField.css("color","#D2D2D2");
    emailField.css("border","none");
  }

  //PHONE NUMBER CHECK
  if (phoneField.val().length <= 0 || !phoneField.val().match("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")) {
    correct = false;
    phoneField.css("color","#DD1111");
    phoneField.css("border","1px solid #DD1111");
  } else {
    phoneField.css("color","#D2D2D2");
    phoneField.css("border","none");
  }

  return correct;
}

function showLogInForm() {
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
    let dataStr = JSON.stringify(data);
    console.log(dataStr);
  }
}

function checkLogInForm() {
  usernameField = $("#logInUsername");
  passwordField = $("#logInPassword");

  correct = true;

  //USERNAME CHECK
  if (usernameField.val().length <= 0) {
    correct = false;
    usernameField.css("color","#DD1111");
    usernameField.css("border","1px solid #DD1111");
  } else {
    usernameField.css("color","#D2D2D2");
    usernameField.css("border","none");
  }

  //PASSWORD CHECK
  if (passwordField.val().length < 8) {
    correct = false;
    passwordField.css("color","#DD1111");
    passwordField.css("border","1px solid #DD1111");
  } else {
    passwordField.css("color","#D2D2D2");
    passwordField.css("border","none");
  }

  return correct;
}

function order() {
  if (checkOrderForm()) {
    pizzaAmounts = document.getElementsByName("pizzaAmount");

    let pizzas = [];

    for (i=0; i<pizzaAmounts.length; i++) {
      pizzaAmount = pizzaAmounts[i] ;
      id = pizzaAmount.id.substr(
      pizzaAmount.id.indexOf("a") + 1,
      pizzaAmount.id.lastIndexOf("a")-pizzaAmount.id.indexOf("a")-1);

      let pizza = new Object();
      pizza.id = id;
      pizza.amount = pizzaAmount.innerHTML;

      pizzas.push(pizza);
    }

    data = new Object();
    data.pizzas = pizzas;
    data.firstName = $("#orderFirstName").val();
    data.lastName = $("#orderLastName").val();
    data.address = $("#orderAddress").val();
    console.log(JSON.stringify(data));
  }
}

function checkOrderForm() {
  firstnameField = $("#orderFirstName");
  lastnameField = $("#orderLastName");
  addressField = $("#orderAddress");

  correct = true;

  //FIRST NAME CHECK
  if (firstnameField.val().length <= 0) {
    correct = false;
    firstnameField.css("color","#DD1111");
    firstnameField.css("border","1px solid #DD1111");
  } else {
    firstnameField.css("color","#D2D2D2");
    firstnameField.css("border","none");
  }

  //LAST NAME CHECK
  if (lastnameField.val().length <= 0) {
    correct = false;
    lastnameField.css("color","#DD1111");
    lastnameField.css("border","1px solid #DD1111");
  } else {
    lastnameField.css("color","#D2D2D2");
    lastnameField.css("border","none");
  }

  //ADDRESS CHECK
  if (addressField.val().length <= 0) {
    correct = false;
    addressField.css("color","#DD1111");
    addressField.css("border","1px solid #DD1111");
  } else {
    addressField.css("color","#D2D2D2");
    addressField.css("border","none");
  }

  return correct;
}

function showOrderForm() {
    $("#orderForm").css("display", "inline-block");
    hideSignUpForm();
    hideLogInForm();
}

function hideOrderForm() {
    $("#orderForm").css("display", "none");
}
