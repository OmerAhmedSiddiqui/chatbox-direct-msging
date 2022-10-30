// Import the functions you need from the SDKs you need
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { doc, collection, setDoc, Timestamp, addDoc, getDocs, query, where, onSnapshot, orderBy } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";
import { db, storage, auth } from "./lib.js";

let ulEl = document.querySelector("#ulEl")
let msgEl = document.querySelector("#msgEl");
var msgSavingUid;





//          geting data of respective selected user

var btn;

async function gettingChatOnButton() {
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
                let img = document.createElement("img")
                img.src = profileImage.src;
                img.setAttribute("class", "msgingImg no-gutters")
                let li = document.createElement("li");
           
                li.classList.add("msgSend")
                let p = document.createElement("P");
                p.innerHTML = doc.data().msg
                p.setAttribute("class", "d-inline h5 font-weight-lighter mr-3 ")
                li.appendChild(p)
                li.appendChild(img);
                msgEl.appendChild(li)
            }
            else {
                let img = document.createElement("img")
                img.src = url;
                img.setAttribute("class", "msgingImg")
                let li = document.createElement("li");
                li.classList.add("msgRecieve")

                let p = document.createElement("P");
                p.innerHTML = doc.data().msg
                p.setAttribute("class", "d-inline h5 font-weight-lighter")
                li.appendChild(img)
                li.appendChild(p)
                msgEl.appendChild(li)

            }

        })


    })

}

async function fetchAllDatas() {
    var userDocRef = collection(db, "usersdata");
    let q = query(userDocRef, where("uid", "!=", auth.currentUser.uid));
    let profileData = await getDocs(q);

    profileData.forEach((doc) => {
        var img = document.createElement("img")
        var source = doc.data().picURl;
        img.src = source;
        btn = document.createElement("BUTTON");

        var li = document.createElement("li");
        var h4 = document.createElement("h5");

        var recieverImg = document.querySelector("#recieverImg");
        var recieverName = document.querySelector("#recieverName");


        h4.innerHTML = doc.data().name;
        h4.setAttribute("class", "font-weight-lighter d-inline")
        btn.appendChild(img)
        btn.appendChild(h4)
        li.appendChild(btn)
        btn.setAttribute("class", "btn d-inline")
        btn.addEventListener("click", gettingChatOnButton)
        ulEl.appendChild(li)
    });
}





//            sending new Messages

var send = document.querySelector("#send");
send.addEventListener("click", sendMessages);

var txt = document.querySelector("#txt");

async function sendMessages() {
    // let time = new Date().getTime();
    const docRef = await addDoc(collection(db, "mssages"), {
        msg: txt.value,
        mixUid: msgSavingUid,
        uid: auth.currentUser.uid,
        time:Timestamp.fromDate(new Date())
    });
    // updatedBox()

}




//           fetching login user data

let profileImage;
async function fetchMyDatas() {
    // ulEl.innerHTML = ""
    profileImage = document.querySelector("#profileImage")
    let profileName = document.querySelector("#profileName")

    var userDocRef = collection(db, "usersdata");
    let q = query(userDocRef, where("uid", "==", auth.currentUser.uid));
    let profileData = await getDocs(q)
    profileData.forEach((doc) => {
        var name = doc.data().name;
        profileName.innerHTML = name;
        var source = doc.data().picURl;
        if (source === "") {
            source = "download (1).png"
        }
        profileImage.src = source;
    });

}




//              On Auth State Change

let uid;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in,
        uid = user.uid;
        fetchAllDatas();
        fetchMyDatas();
        updatedBox()

        // ...
    } else {
        // User is signed out
        console.log(" User is signed out,");

        // ...
    }
    //  document.querySelector("#txt").value ="";

});





//          showing newly send meassages

function updatedBox() {
    const q = query(collection(db, "mssages"), orderBy("time", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                let li = document.createElement("li");
                var p = document.createElement("p");
                p.innerHTML = change.doc.data().msg

                var img = document.createElement("img")
                img.setAttribute("class", "msgingImg")
                img.src = profileImage.src
                li.appendChild(p)
                li.appendChild(img)
                p.setAttribute("class", "d-inline h5 font-weight-lighter")
                li.setAttribute("class", "msgSend")
                msgEl.appendChild(li);
                txt.value = ""

            }
            if (change.type === "modified") {
                console.log("Modified Message: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed Message: ", change.doc.data());
            }
        });
    });
}



//                    search bar

var search = document.querySelector("#search");
search.addEventListener("click", searchName);

let searchInput = document.querySelector("#searchInput");

async function searchName() {
    ulEl.innerHTML = ""
    var userDocRef = collection(db, "usersdata");
    let q = query(userDocRef, where("name", "==", searchInput.value));
    let profileData = await getDocs(q);

    profileData.forEach((doc) => {
        var img = document.createElement("img")
        var source = doc.data().picURl;
        img.src = source;
        var li = document.createElement("li");
        btn = document.createElement("BUTTON");
        var h4 = document.createElement("h5");
        h4.innerHTML = doc.data().name;
        h4.setAttribute("class", "font-weight-lighter d-inline")
        btn.appendChild(img)
        btn.appendChild(h4)
        li.appendChild(btn)
        btn.setAttribute("class", "btn d-inline")
        ulEl.appendChild(li)
        btn.addEventListener("click", gettingChatOnButton)




    })
    if (searchInput.value === "") {
        ulEl.innerHTML = ""
        fetchAllDatas()
    }
}
