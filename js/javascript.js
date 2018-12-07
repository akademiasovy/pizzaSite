function incrementAmount(element) {
  count = parseInt(element.innerHTML);
  element.innerHTML = count+1;
}
$(document).ready(function() {
  signUp();
});

function signUp78() {
  username = $("#signUpUsername").val();
  console.log('test'+username);
}

function showSignUpForm() {
  $("#signUpForm").css("display","inline-block");
}

//$('h2').click( function(){
//  console.log('hello');
//});

$("#btnSignUp").on("click",signUp);
