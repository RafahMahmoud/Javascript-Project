import {
  auth,
  createUser,
  addData,
  database,
  retrieveData,
  sendEmailLink,
  reference,
  getStorage,
} from "../../../../Firebase-config/firebase-config.js";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

async function addUserData(user) {
  try {
    let url = await uploadImage(user.image, user.userID);
    user.image = url;
    console.log(url);
    let usersRef = reference(database, "Users/" + user.userID);
    addData(usersRef, user);
  } catch (error) {
    console.error("Error adding user data:", error);
  }
}

function uploadImage(imageFile, userID) {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const userImagesRef = storageRef(storage, "userImages/" + userID);

    uploadBytes(userImagesRef, imageFile)
      .then(() => {
        console.log("Image uploaded successfully");
        getDownloadURL(userImagesRef)
          .then((url) => {
            console.log("Download URL:", url);
            resolve(url);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        reject(error);
      });
  });
}

export { addUserData };
