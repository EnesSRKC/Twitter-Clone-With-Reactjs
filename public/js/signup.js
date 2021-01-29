
let signup = document.getElementById("signup-page");

function signupHandler() {
    signup.style.visibility = "visible";
    signup.style.transform = "translateY(100vh)";
}

function signupBackHandler() {
    signup.style.transform = "translateY(-100vh)";
    signup.style.visibility = "hidden";

}


// var signupInputContainer = document.getElementsByClassName("signup-input-container");

// for (let index = 0; index < signupInputContainer.length; index++) {
//     let element = signupInputContainer[index];

//     element.childNodes[3].addEventListener("focus", function () {
//         signupInputContainer.
//     }) 

//     element.childNodes[3].addEventListener("blur", function () {
//     }) 

//     console.log(element.childNodes)
    
// }
