function incrementAmount(element) {
  count = parseInt(element.innerHTML);
  element.innerHTML = count+1;
}

function showSignUpForm() {
  $("#signUpForm").css("display","inline-block");
}
