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
    const docRef = await addDoc(collection(db, "usersdata"), {

        name: name.value,
        email: email.value,
        password: password.value,
        picURl: url
    });

   

}
let fileUpload = document.querySelector("#fileUploader");
// var url = ""

fileUpload.addEventListener("change", storageFunc);
async function storageFunc() {
    let file = fileUpload.files[0];
    let imageRef = ref(storage, `images/${file.name}`);
    let uploaded = await uploadBytes(imageRef, file);
    url = await getDownloadURL(imageRef);
    console.log(url)
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
    //   location = "chatbox.html"
      console.log(user)

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      swal("Error!", errorMessage, "error")

    });

}