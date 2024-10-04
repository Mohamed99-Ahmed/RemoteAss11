// start sections  Variables
const loginSection = document.querySelector("#signin");
const signUpSection = document.querySelector("#signup");
const homeSection = document.querySelector("#home");
// start login Section  variables
const  loginEmail = document.querySelector("#emailLogin");
const  loginPassword = document.querySelector("#passwordLogin");
const  loginBtn = document.querySelector("#loginBtn");
const signinError = document.querySelector("#signinError")
const signinEmaiError = document.querySelector("#signinEmaiError")
const signUpLink = document.querySelector("#signUpLink");
// start home Section variables
const homeBtn = document.querySelector("#homeBtn");
const logoutBtn = document.querySelector("#logoutBtn");
// Start sign-up Section variables
const signUpName = document.querySelector("#nameSignUp");
const signUpEmail = document.querySelector("#emailSignUp");
const signUpPassword = document.querySelector("#passwordSignUp");
const signUpBtn = document.querySelector("#signUpBtn");
const signUpError = document.querySelector("#signUpError");
const emailError = document.querySelector("#emailError");
const successSignUp = document.querySelector("#successSignUp");
const nameError = document.querySelector("#nameError");
const signInLink = document.querySelector("#signInLink");
// start global variables
let valName = /^[A-Za-z]{3,}$/;
let valEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let valPassword = /^[@][A-Z][A-Za-z0-9]{4,}$/;
let users ;
if(localStorage.getItem("users")){
    users = JSON.parse(localStorage.getItem("users"));
}else{
    users = [];
}

// start functions

// Add user function to user array and localStorage
function addUser(){
    let user = {
        name:signUpName.value,
        email:signUpEmail.value,
        password:signUpPassword.value,
    }
    users.push(user);
    localStorage.setItem("users",JSON.stringify(users));
}
// Sign up functions and Add user
function validateSignUp(){
    if(signUpName.value === "" || signUpEmail.value === "" || signUpPassword.value === ""){
        signUpError.classList.remove("d-none"); //Display Eorror (All inputs must be requied)
    }else{
        // Validate name
        if (!valName.test(signUpName.value)) {
            nameError.classList.remove("d-none");
            signUpError.classList.add("d-none");
        } else if(users.some(user => user.email === signUpEmail.value) || !valEmail.test(signUpEmail.value)){
            nameError.classList.add("d-none");
            emailError.classList.remove("d-none");
            signUpError.classList.add("d-none");
        }else if(!valPassword.test(signUpPassword.value)){
            nameError.classList.add("d-none");
            emailError.classList.add("d-none");
            passwordError.classList.remove("d-none");
            signUpError.classList.add("d-none");
        }
        else{
            addUser();
            successSignUp.classList.remove("d-none");
            signUpError.classList.add("d-none");
            nameError.classList.add("d-none");
            emailError.classList.add("d-none");
            passwordError.classList.add("d-none");
        }
    }
}


// start Login functions

function validateSignIn() {
    if (loginEmail.value == "" || loginPassword.value == "") {
        signinError.classList.remove("d-none");
    } 
    else {
        let userFound = false;
        for (let i = 0; i < users.length; i++) {
            if (loginEmail.value == users[i].email && loginPassword.value == users[i].password) {
                signinError.classList.add("d-none");
                signinEmaiError.classList.add("d-none");
                loginSection.classList.add("d-none");
                homeSection.classList.remove("d-none");
                homeSection.querySelector("article .box h1 span").innerHTML = users[i].name;
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            signinEmaiError.classList.remove("d-none");
            signinError.classList.add("d-none");
        }
    }
}

loginBtn.addEventListener("click", validateSignIn);
signUpLink.addEventListener("click",()=>{
    loginSection.classList.add("d-none");
    signUpSection.classList.remove("d-none");
})

logoutBtn.addEventListener("click",  () => {
    homeSection.classList.add("d-none");
    loginSection.classList.remove("d-none");
});
signUpBtn.addEventListener("click",validateSignUp);
signInLink.addEventListener("click",()=>{
    loginSection.classList.remove("d-none");
    signUpSection.classList.add("d-none");
});