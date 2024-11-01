import { showCustomAlert } from "./CustomAlert.js";
import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

let logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out.");
      location.href = "../welcome-page.html";
      showCustomAlert("You have been logged out successfully.");
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });
});

console.log(logout);

// auth.onAuthStateChanged((currentuser) => {
//     if (!currentuser) {
//         location.href = "../welcome-page.html";
//          showCustomAlert(,"You have been logged out successfully.");
//   }
// });
