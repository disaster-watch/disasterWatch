import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"; // Correctly importing Auth

const firebaseConfig = {
  apiKey: "AIzaSyBeT6dfYJHQsBmUTvMi_6njM3Ynnz7uD0w",
  authDomain: "disaster-watch-142a6.firebaseapp.com",
  projectId: "disaster-watch-142a6",
  storageBucket: "disaster-watch-142a6.appspot.com",
  messagingSenderId: "747625354937",
  appId: "1:747625354937:web:287f5a88929e4b616ced68",
  measurementId: "G-RF3RSLXZQR",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
