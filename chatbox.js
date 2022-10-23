// Import the functions you need from the SDKs you need
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { doc, collection, setDoc, Timestamp, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";
import { db, storage, auth } from "./lib.js";

let ulEl = document.querySelector("#ulEl")
// fetchDatas()
async function fetchDatas() {
    var userDocRef = collection(db, "usersdata");
    let q = query(userDocRef, where("uid", "==", uid));
console.log(uid);
    let profileData = await getDocs(userDocRef)
    profileData.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        var img = document.createElement("img")
        var source = doc.data().picURl;
        if (source === "") {
            source = "download (1).png"
        }
        img.src = source;
        var li = document.createElement("li")
        var liText = document.createTextNode(doc.data().name);
        li.appendChild(img)
        li.appendChild(liText)
        ulEl.appendChild(li)


    });


}
let uid ;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in,
         uid = user.uid;
        console.log(" User is signed in,");
        fetchDatas()

        // ...
    } else {
        // User is signed out
        console.log(" User is signed out,");

        // ...
    }
});