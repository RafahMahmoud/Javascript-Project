import { getUserData } from "./UserControllers/retrieveUser.js";

async function displayUserInformation() {
  let userName = document.getElementById("userName");
  let userImage = document.getElementById("user-image-nav");
  let userID = JSON.parse(sessionStorage.getItem("currentUser"));
  let user = await getUserData(userID);
  console.log(user.firstName);
  userName.innerText = user.firstName + " " + user.lastName;
  userImage.src = user.image;
}

displayUserInformation();
