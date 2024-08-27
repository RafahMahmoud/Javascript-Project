import { getUserData } from "../UserControllers/retrieveUser.js";

async function displayUserData() {
  let userName = document.getElementById("userName");
  let description = document.getElementById("description");
  let userImage = document.getElementById("user-image");
  let userID = JSON.parse(sessionStorage.getItem("currentUser"));

  let userData = await getUserData(userID);

  userName.innerText = userData.firstName + " " + userData.lastName;
  description.innerText = userData.bio;
  console.log(userData.image);
  userImage.src = await userData.image;
}

displayUserData();
