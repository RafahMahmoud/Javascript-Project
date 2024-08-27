import {
  auth,
  loginFirebase,
} from "../../../../Firebase-config/firebase-config.js";

function login(email, password) {
  console.log(email);
  console.log(password);
  loginFirebase(auth, email, password)
    .then((userCredential) => {
      let user = userCredential.user;

      if (isVerified(user)) {
        sessionStorage.setItem("currentUser", JSON.stringify(user.uid));
        location.replace("http://127.0.0.1:5500/Pages/Home-Page/Home.html");
      } else {
        alert(
          "Please check your email and make sure that you have verified this email"
        );
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
    });
}

function isVerified(user) {
  if (user.emailVerified) return true;
  else return false;
}

export { login };

function loginWithGoogle() {}
