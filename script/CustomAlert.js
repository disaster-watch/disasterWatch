// Create
const customAlertBox = document.createElement("div");
customAlertBox.id = "customAlertBox";
customAlertBox.className = "custom-alert";

const customAlertContent = document.createElement("div");
customAlertContent.className = "custom-alert-content";

const alertTitle = document.createElement("h2");
alertTitle.id = "myAlertTitle";
alertTitle.innerHTML = "Custom Alert Title";

const alertText = document.createElement("p");
alertText.id = "myAlertText";
alertText.innerHTML = "This is a custom alert message.";

// Create a line break
const lineBreak = document.createElement("br");

const customAlertOk = document.createElement("button");
customAlertOk.id = "customAlertOk";
customAlertOk.className = "custom-alert-button";
customAlertOk.innerHTML = "Okay";

customAlertContent.appendChild(alertTitle);
customAlertContent.appendChild(alertText);
customAlertContent.appendChild(lineBreak);
customAlertContent.appendChild(customAlertOk);

customAlertBox.appendChild(customAlertContent);

document.body.appendChild(customAlertBox);

// Function to show the custom alert box
export function showCustomAlert(title, text) {
  alertTitle.textContent = title;
  if (title.includes("Error")) {
    alertTitle.style.color = "red";
  } else {
    alertTitle.style.color = "green";
  }
  alertText.textContent = text;
  customAlertBox.style.display = "flex";
}

// Function to close the custom alert box
export function closeCustomAlert() {
  customAlertBox.style.display = "none";
}

customAlertOk.addEventListener("click", closeCustomAlert);
