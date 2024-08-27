import { login } from "./login.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  database,
  reference,
  auth,
} from "../../../../Firebase-config/firebase-config.js";

function getDataFromLoginForm(event) {
  event.preventDefault();
  let userData = document.getElementById("Login-Form");

  login(userData.email.value, userData.password.value);
}

let loginForm = document.getElementById("Login-Form");
loginForm.addEventListener("submit", getDataFromLoginForm);

const googleSignInBtn = document.getElementById("Login-Google");
googleSignInBtn.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const [username] = user.displayName
      ? user.displayName.split(" ")
      : ["", ""];
    const userData = {
      username,
      email: user.email,
      uid: user.uid,
    };

    let userRef = reference(database, "Users/" + userData.uid);

    await addData(userRef, userData);
    localStorage.setItem("userData", JSON.stringify(userData));

    alert("Sign in successfull");
    setTimeout(() => {
      window.location.href = "/";
    }, 4000);
  } catch (error) {
    alert(error.message);
  }
});
