import {
  retrieveData,
  reference,
  database,
} from "../../Firebase-config/firebase-config.js";

function getUserData(userID) {
  return new Promise((resolve, reject) => {
    let userRef = reference(database, "Users/" + userID);

    retrieveData(userRef, (snapshot) => {
      if (snapshot.exists()) {
        resolve(snapshot.val());
      } else {
        reject("No data found");
      }
    });
  });
}

export { getUserData };
