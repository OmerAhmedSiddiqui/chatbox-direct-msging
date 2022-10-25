// Import the functions you need from the SDKs you need
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { doc, collection, setDoc, Timestamp, addDoc } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";
import { db, storage, auth } from "./lib.js";

//                                                        SignUp



let signup = document.querySelector("#signup");
signup.addEventListener("click", createUSer);

let email = document.querySelector("#email");
let password = document.querySelector("#pass");
let repeatPasssword = document.querySelector("#re_pass");

let name = document.querySelector("#name");
async function createUSer() {
    //                          creating user 
    if (password.value === repeatPasssword.value) {

        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        // Email verification sent!
                        swal("Great!", "Your Account Is Created! verify Your Email To Continue", "success")
                        location = "chatbox.html"
                        // ...
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                swal("Error!", errorMessage, "error")

                // ..
            });

    }
    else {
        swal("Error!", "Repeat Password Does Not Match Password", "error")

    }



}

let upload = document.querySelector("#upload");
signup.addEventListener("click", databaseFunc);
var url = "";


async function databaseFunc() {

    // Add a new document with a generated id.
    if (url === "") {
        url = "download (1).png"
    }
    const docRef = await addDoc(collection(db, "usersdata"), {

        name: name.value,
        email: email.value,
        password: password.value,
        picURl: url,
        uid: auth.currentUser.uid
    });


}
let fileUpload = document.querySelector("#fileUploader");

fileUpload.addEventListener("change", storageFunc);
async function storageFunc() {
    let file = fileUpload.files[0];
    let imageRef = ref(storage, `images/${auth.currentUser.uid}`);
    let uploaded = await uploadBytes(imageRef, file);
    url = await getDownloadURL(imageRef);
}



let signin = document.querySelector("#signin");
signin.addEventListener("click", signinFunc);

async function signinFunc() {

    let email = document.querySelector("#your_email");
    let password = document.querySelector("#your_pass");
    let name = document.querySelector("#name");


    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            location = "chatbox.html"
            console.log(user)

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            swal("Error!", errorMessage, "error")

        });

}





let signUpLink = document.querySelector("#signUpLink")
signUpLink.addEventListener("click", UserAlreadyCreated)

function UserAlreadyCreated() {
    let signupContainer = document.querySelector("#Signup-Container")
    signupContainer.style.visibility = "hidden"

    let siginContainer = document.querySelector("#sigin-Container")
    siginContainer.style.visibility = "visible"


}


let signInImageLink = document.querySelector("#signInImageLink")
signInImageLink.addEventListener("click", alreadyAccount)

function alreadyAccount() {
    let siginContainer = document.querySelector("#sigin-Container")
    siginContainer.style.visibility = "hidden"

    let signupContainer = document.querySelector("#Signup-Container")
    signupContainer.style.visibility = "visible"
}




