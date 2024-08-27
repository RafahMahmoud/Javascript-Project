import { signup, createUser } from "./Signup.js";
import {
  sendEmailLink,
  signInWithPopup,
  auth,
} from "../../../../Firebase-config/firebase-config.js";
import {
  GoogleAuthProvider,
  reference,
  database,
  addData,
} from "../../../../Firebase-config/firebase-config.js";
import { User } from "../../../../Data-Models/UserDataModel.js";

function getDataFromSignupForm(event) {
  event.preventDefault();
  let userData = event.target;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let lowerCaseRegex = /(?=.*[a-z])/;

  let upperCaseRegex = /(?=.*[A-Z])/;

  let digitRegex = /(?=.*\d)/;

  let symbolRegex = /(?=.*[!@#$%^&*()_+}{":;'?/><,.\\[\]-])/;

  let stringLengthRegex = /^.{8,}$/;

  let user = new User(
    "",
    userData.firstName.value,
    userData.lastName.value,
    userData.email.value,
    userData.image.files[0],
    userData.bio.value
  );
  if (!emailRegex.test(user.email)) {
    alert("Please enter the correct email format name@domain.com");
  } else if (!lowerCaseRegex.test(userData.password.value)) {
    alert(
      "Please make sure that your password contains at least 1 lowercase charachter"
    );
  } else if (!upperCaseRegex.test(userData.password.value)) {
    alert(
      "Please make sure that your password has at least 1 uppercase charechter"
    );
  } else if (!digitRegex.test(userData.password.value)) {
    alert("Please make sure that your password contains at least 1 digit");
  } else if (!symbolRegex.test(userData.password.value)) {
    alert("Make sure that your password has at least 1 symbol");
  } else if (!stringLengthRegex.test(userData.password.value)) {
    alert("make sure that your password is at least 8 digits long");
  } else if (userData.password.value != userData.repeatPassword.value) {
    alert("Make sure that your passwords match");
  } else {
    signup(user, userData.password.value);
  }
}

let signupForm = document.getElementById("Signup-Form");
signupForm.addEventListener("submit", getDataFromSignupForm);

const googleSignUpBtn = document.getElementById("Signup-Google");
googleSignUpBtn.addEventListener("click", async () => {
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

    alert("registeration sucessfull");
    setTimeout(() => {
      window.location.href = "/";
    }, 4000);
  } catch (error) {
    alert(error.message);
  }
});
