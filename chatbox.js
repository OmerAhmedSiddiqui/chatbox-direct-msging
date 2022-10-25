// Import the functions you need from the SDKs you need
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { doc, collection, setDoc, Timestamp, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";
import { db, storage, auth } from "./lib.js";

let ulEl = document.querySelector("#ulEl")
var msgSavingUid;
async function fetchAllDatas() {
    var userDocRef = collection(db, "usersdata");
    let profileData = await getDocs(userDocRef)
    profileData.forEach((doc) => {
        var img = document.createElement("img")
        var source = doc.data().picURl;
        img.src = source;
        var li = document.createElement("li");
        var btn = document.createElement("BUTTON");
        var recieverImg = document.querySelector("#recieverImg");
        var recieverName = document.querySelector("#recieverName");

        $(btn).click(async function () {
            let msgEl = document.querySelector("#msgEl");
            msgEl.innerHTML = ""
            let url = $(this).find('img').attr('src');
            var userDocRef = collection(db, "usersdata");
            let q = query(userDocRef, where("picURl", "==", url));
            let profileData = await getDocs(q);

            recieverImg.src = url
            profileData.forEach(async (doc) => {
                recieverName.innerHTML = doc.data().name
                if (doc.data().uid > auth.currentUser.uid) {
                    msgSavingUid = doc.data().uid + auth.currentUser.uid
                }
                else {
                    msgSavingUid = auth.currentUser.uid + doc.data().uid
                }
                let userDocRef = collection(db, "mssages");
                let q = query(userDocRef, where("mixUid", "==", msgSavingUid));
                let profileData = await getDocs(q);
                profileData.forEach((doc) => {

                    if (doc.data().uid === auth.currentUser.uid) {
                        // img.src =
                        let img = document.createElement("img")
                        img.src = source;
                        img.setAttribute("class", "msgingImg")
                        let li = document.createElement("li");
                        li.classList.add("msgSend")

                        let p = document.createElement("P");
                        p.innerHTML = doc.data().msg
                        p.setAttribute("class", "d-inline h5 font-weight-lighter ml-2 ")
                        li.appendChild(p)
                        li.appendChild(img)
                        msgEl.appendChild(li)
                    }
                    else {
                        // img.src =
                        let img = document.createElement("img")
                        img.src = url;
                        img.setAttribute("class", "msgingImg")
                        let li = document.createElement("li");
                        li.classList.add("msgRecieve")

                        let p = document.createElement("P");
                        p.innerHTML = doc.data().msg
                        p.setAttribute("class", "d-inline h5 font-weight-lighter ml-2 ")
                        li.appendChild(img)
                        li.appendChild(p)
                        msgEl.appendChild(li)

                    }

                })


            })

        })
        var liText = document.createTextNode(doc.data().name);
        btn.appendChild(img)
        btn.appendChild(liText)
        li.appendChild(btn)
        btn.setAttribute("class", "btn d-inline")
        ulEl.appendChild(li)
    });
}
var send = document.querySelector("#send");
send.addEventListener("click", loadMessages);

var txt = document.querySelector("#txt");



async function loadMessages() {
    let time = new Date().getTime();
    txt.innerHTML = ""
    const docRef = await addDoc(collection(db, "mssages"), {
        msg: txt.value,
        mixUid: msgSavingUid,
        uid: auth.currentUser.uid,
        time,
    });
}



var source;
console.log(source);
async function fetchMyDatas() {

    let profileImage = document.querySelector("#profileImage")
    let profileName = document.querySelector("#profileName")

    var userDocRef = collection(db, "usersdata");
    let q = query(userDocRef, where("uid", "==", auth.currentUser.uid));
    let profileData = await getDocs(q)
    profileData.forEach((doc) => {
        var name = doc.data().name;
        profileName.innerHTML = name;
        source = doc.data().picURl;
        if (source === "") {
            source = "download (1).png"
        }
        profileImage.src = source;
    });

}
let uid;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in,
        uid = user.uid;
        console.log(" User is signed in,");
        fetchAllDatas();
        fetchMyDatas()

        // ...
    } else {
        // User is signed out
        console.log(" User is signed out,");

        // ...
    }
});