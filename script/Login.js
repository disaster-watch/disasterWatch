import { showCustomAlert } from "./CustomAlert.js";
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

function Login() {
  const eyeOff =
    "../img/visibility_off_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
  const eyeOn = "../img/visibility_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

  // Selections
  const usernameInput = document.getElementById("username_two");
  const passwordInput = document.getElementById("password_two");
  const eyeIcon = document.getElementById("eye_two");
  const loginBtn = document.getElementById("Login_submit");

  // Error display elements
  const error_email = document.getElementById("error_email");
  const errorPassword = document.getElementById("error_password");

  //loader
  let isloading = false;

  // Event listeners
  eyeIcon.addEventListener("click", togglePasswordVisibility);
  loginBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    const isUseremailValid = validateEmail(username);
    const isPasswordValid = validatePassword(password);

    if (isUseremailValid && isPasswordValid) {
      await signInUser(username, password);
    }
  });

  // Toggle password visibility
  function togglePasswordVisibility() {
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
    eyeIcon.src = passwordInput.type === "password" ? eyeOff : eyeOn;
  }

  function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value === "") {
      error_email.textContent = "Email can't be empty";
      return false;
    } else if (!emailRegex.test(value)) {
      error_email.textContent = "Invalid email address";
      return false;
    } else {
      error_email.textContent = "";
      return true;
    }
  }

  // Validate password function
  function validatePassword(value) {
    if (value === "") {
      errorPassword.textContent = "Password can't be empty";
      return false;
    } else if (value.length < 6) {
      errorPassword.textContent = "Password must be at least 6 characters long";
      return false;
    }
    errorPassword.textContent = "";
    return true;
  }

  // Error massage
  const errorMap = {
    "auth/invalid-email": "Invalid email address.",
    "auth/user-not-found": "User not found.",
    "auth/network-request-failed":
      "Oops! Check your internet connection and try again.",
    "auth/wrong-password": "Incorrect password.",
    "auth/email-already-in-use": "The email address is already in use",
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
    "auth/too-many-requests":
      "Too many login attempts. Please try again later.",
    "auth/invalid-credential": "invalid email or password",
    "auth/invalid-verification-code": "The verification code is invalid.",
    "auth/invalid-verification-id": "The verification ID is invalid.",
    "auth/operation-not-allowed": "Operation not allowed.",
    "auth/expired-action-code": "The action code has expired.",
    "auth/invalid-action-code": "The action code is invalid.",
    "auth/user-token-expired": "User's token has expired.",
  };

  async function signInUser(email, password) {
    isloading = true;
    loginBtn.textContent = "Logging in...";

    // loginBtn.disabled = true;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      //  email is verified
      if (!user.emailVerified) {
        showCustomAlert("Error", "Please verify your email before logging in.");
        return;
      }

      localStorage.setItem("account_active", "true");
      showCustomAlert("Success", "User signed in successfully.");
      location.href = "../login/main.html";
      console.log("User signed in:", user);
    } catch (error) {
      const errorMessage =
        errorMap[error.code] || "An unexpected error occurred.";
      showCustomAlert("Error", errorMessage);
      console.error("Error signing in:", error.code, errorMessage);
      if (error.code === "auth/too-many-requests") {
        loginBtn.disabled = true;
        setTimeout(() => {
          loginBtn.disabled = false;
        }, 30000);
      }
    } finally {
      isloading = false;
      loginBtn.textContent = "Login";
    }
  }
}

document.addEventListener("DOMContentLoaded", Login);
