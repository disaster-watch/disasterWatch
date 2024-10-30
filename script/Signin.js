import { showCustomAlert } from "./CustomAlert.js";
import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

function Signin() {
  const eyeOff =
    "../img/visibility_off_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
  const eyeOn = "../img/visibility_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

  // Selections
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const eyemain = document.getElementById("eye_main");
  const signInBtn = document.getElementById("submit");

  // Error display elements
  const usernameError = document.getElementById("username_error");
  const emailError = document.getElementById("email_error");
  const passwordError = document.getElementById("error_password");

  //loader
  let isloading = false;

  // Event listeners
  eyemain.addEventListener("click", togglePasswordVisibility);
  signInBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    validateUsername(username);
    validateEmail(email);
    validatePassword(password);

    // Proceed with authentication if validations pass
    if (
      validateUsername(username) &&
      validateEmail(email) &&
      validatePassword(password)
    ) {
      signInUser(email, password);
    }
  });

  // Toggle password visibility
  function togglePasswordVisibility() {
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
    eyemain.src = passwordInput.type === "password" ? eyeOff : eyeOn;
  }

  // Validation functions
  function validateUsername(value) {
    if (value === "") {
      usernameError.textContent = "Username can't be empty";
      return false;
    } else if (value.length < 4) {
      usernameError.textContent = "Username can't be less than four characters";
      return false;
    } else {
      usernameError.textContent = "";
      return true;
    }
  }

  function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value === "") {
      emailError.textContent = "Email can't be empty";
      return false;
    } else if (!emailRegex.test(value)) {
      emailError.textContent = "Invalid email address";
      return false;
    } else {
      emailError.textContent = "";
      return true;
    }
  }

  function validatePassword(value) {
    if (value.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters long";
      return false;
    } else {
      passwordError.textContent = "";
      return true;
    }
  }

  // Error mapping for authentication errors
  const errorMap = {
    "auth/invalid-email": "The email address is badly formatted.",
    "auth/email-already-in-use":
      "The email address is already in use by another account.",
    "auth/weak-password": "The password is too weak.",
    "auth/user-disabled": "Your account has been disabled.",
    "auth/operation-not-allowed": "Operation not allowed.",
    "auth/requires-recent-login":
      "This operation requires recent authentication.",
    "auth/account-exists-with-different-credential":
      "An account exists with the same email but different credentials.",
    "auth/credential-already-in-use":
      "The credential is already associated with a different user account.",
    "auth/popup-closed-by-user":
      "The popup was closed by the user before completing the sign-in.",
    "auth/popup-blocked": "The popup was blocked by the browser.",
    "auth/too-many-requests": "Too many requests. Please try again later.",
    "auth/network-request-failed":
      "Network error. Please check your internet connection.",
    "auth/user-not-found": "No user found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "The authentication credential is invalid.",
    "auth/invalid-verification-code": "The verification code is invalid.",
    "auth/invalid-verification-id": "The verification ID is invalid.",
  };

  async function signInUser(userEmail, userPassword) {
    isloading = true;
    signInBtn.textContent = "Signing in...";
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      showCustomAlert("Success", "User signed in");

      // Send email verification
      const user = userCredential.user;
      await sendEmailVerification(user);
      showCustomAlert(
        "Verification",
        "Verification email sent. Please check your inbox."
      );
    } catch (error) {
      console.error("Error details:", error);
      const errorMessage = errorMap[error.code] || "An unknown error occurred.";
      showCustomAlert("Error", errorMessage);
      console.error("Error signing in:", error, errorMessage);
    } finally {
      isloading = false;
      signInBtn.textContent = "SIGNUP";
    }
  }
}

document.addEventListener("DOMContentLoaded", Signin);
