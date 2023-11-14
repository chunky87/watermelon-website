var username = document.getElementById("username");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("cpassword");
var startChar = document.getElementById("startChar");
var first = /^[a-z]/i;
var least3 = document.getElementById("least3");
var threeOrMore = /^.{3,}$/g;
var least8 = document.getElementById("least8");
var eightOrMore = /^.{8,}$/g;
var anUpper = document.getElementById("anUpper");
var upperCase = /[A-Z]/g;
var aNumber = document.getElementById("aNumber");
var numbers = /[0-9]/g;
var aSpecial = document.getElementById("aSpecial");
var specials = /[/*\-\+!@#$^&~\[\]]/g;
var main = document.getElementById("main");
var userValid = false;
var pwdValid = false;
var pwdMatch = false;

username.onfocus = function () {
    document.getElementById("usernameMessage").style.display = "block";
}

username.onblur = function () {
    document.getElementById("usernameMessage").style.display = "none";
}

username.onkeyup = function () {
    if (username.value.match(first)) {
        startChar.classList.remove("invalid");
        startChar.classList.add("valid");
    }
    else {
        startChar.classList.remove("valid");
        startChar.classList.add("invalid");
    }
    if (username.value.match(threeOrMore)) {
        least3.classList.remove("invalid");
        least3.classList.add("valid");
    }
    else {
        least3.classList.remove("valid");
        least3.classList.add("invalid");
    }
    if (startChar.className == "valid" && least3.className == "valid") {
        userValid = true;
        console.log("username valid");
    }
    else {
        userValid = false;
        console.log("username invalid");
    }
}

password.onfocus = function () {
    document.getElementById("passwordMessage").style.display = "block";
}

password.onblur = function () {
    document.getElementById("passwordMessage").style.display = "none";
}

password.onkeyup = function () {
    if (password.value.match(eightOrMore)) {
        least8.classList.remove("invalid");
        least8.classList.add("valid");
    }
    else {
        least8.classList.remove("valid");
        least8.classList.add("invalid");
    }
    if (password.value.match(upperCase)) {
        anUpper.classList.remove("invalid");
        anUpper.classList.add("valid");
    }
    else {
        anUpper.classList.remove("valid");
        anUpper.classList.add("invalid");
    }
    if (password.value.match(numbers)) {
        aNumber.classList.remove("invalid");
        aNumber.classList.add("valid");
    }
    else {
        aNumber.classList.remove("valid");
        aNumber.classList.add("invalid");
    }
    if (password.value.match(specials)) {
        aSpecial.classList.remove("invalid");
        aSpecial.classList.add("valid");
    }
    else {
        aSpecial.classList.remove("valid");
        aSpecial.classList.add("invalid");
    }
    if (least8.className == "valid" && anUpper.className == "valid" &&
        aNumber.className == "valid" && aSpecial.className == "valid") {
        pwdValid = true;
        console.log("password valid");
    }
    else {
        pwdValid = false;
        console.log("password invalid");
    }
}

confirmPassword.onfocus = function () {
    document.getElementById("confirmMessage").style.display = "block";
}

confirmPassword.onblur = function () {
    document.getElementById("confirmMessage").style.display = "none";
}

confirmPassword.onkeyup = function () {
    if (password.value == confirmPassword.value) {
        confirmMessage.style.color = 'green';
        confirmMessage.innerHTML = 'Passwords match';
        confirmMessage.classList.remove("invalid");
        confirmMessage.classList.add("valid");
        pwdMatch = true;
        console.log("passwords match");
    }
    else {
        confirmMessage.style.color = 'red';
        confirmMessage.innerHTML = 'Passwords do not match';
        confirmMessage.classList.remove("valid");
        confirmMessage.classList.add("invalid");
        pwdMatch = false;
        console.log("passwords do not match");
    }
}

main.onsubmit = function (event) {
    if (userValid == false) {
        event.preventDefault();
        alert("Username is invalid");
        console.log("username does not meet conditions");
        username.value = "";
        startChar.classList.remove("valid");
        startChar.classList.add("invalid");
        least3.classList.remove("valid");
        least3.classList.add("invalid");
        return false;
    }
    if (pwdValid == false) {
        event.preventDefault();
        alert("Password is invalid");
        console.log("password does not meet conditions");
        password.value = "";
        least8.classList.remove("valid");
        least8.classList.add("invalid");
        anUpper.classList.remove("valid");
        anUpper.classList.add("invalid");
        aNumber.classList.remove("valid");
        aNumber.classList.add("invalid");
        aSpecial.classList.remove("valid");
        aSpecial.classList.add("invalid");
        return false;
    }
    if (pwdMatch == false) {
        event.preventDefault();
        alert("Passwords do not match");
        console.log("passwords do not match");
        confirmPassword.value = "";
        confirmMessage.classList.remove("valid");
        confirmMessage.classList.add("invalid");
        return false;
    }
    console.log("Form submitted");
    return true;
}
