import {
  auth,
  createUser,
  addData,
  database,
  retrieveData,
  sendEmailLink,
} from "../../../../Firebase-config/firebase-config.js";
import { addUserData } from "../CreateUserController/CreateUser.js";

function signup(user, password) {
  createUser(auth, user.email, password)
    .then((userCredential) => {
      sendEmailLink(auth.currentUser).then(() => {
        alert(
          "an email verification link has been sent to this account please check your inbox in order to login"
        );
        user.userID = auth.currentUser.uid;

        addUserData(user);
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
    });
}

export { signup, createUser };
