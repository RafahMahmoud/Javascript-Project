import {
    push,
    auth, //the same getAuth(app) but this in variable
    database, //the same getDatabase(app) but this in variable
    reference, //the same ref but this in variable
    addData, //the same set but this in variable
    retrieveData, //the same onValue but this in variable
    query,
  } from "../../Firebase-config/firebase-config.js";

  import{getUserData}from "../../Controllers/UserControllers/retrieveUser.js"


  function addComment(movieId, commentText) {
    const userId = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!userId) {
      alert("You must be logged in to add a comment.");
      return;
    }
  
    const commentRef = reference(database, `Movies/${movieId}/comments`);
    const newCommentRef = push(commentRef);
    
    const comment = {
        text: commentText,
        userId: userId,
          times: Date.now(),
    };
    console.log(comment.times);
    
    addData(newCommentRef, comment)
      .then(() => {
        alert("Comment added successfully.");
      })
      .catch((error) => {
        console.error("Error adding comment: ", error);
      });
  }
  
  
  document.getElementById("Review-Submit").addEventListener("submit", function (e) {
    e.preventDefault(); 
  
    const commentText = document.getElementById("Review-Text-Field").value;
  
    const movieInfo = JSON.parse(sessionStorage.getItem("movie"));
    const movieId = movieInfo.movieID;

    addComment(movieId, commentText);
  });


  async function addCard(comment) {
    let commentGroup = document.querySelector('.commentsGroup');
    
    let userdata = await getUserData(comment.userId);
  
    let commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.innerHTML = `
      <p class="CommenterName">${userdata.firstName}</p>
      <p>${comment.text}</p>
    `;
    
    commentGroup.appendChild(commentElement);
  }
  
  function loadComments(movieId) {
    const commentRef = reference(database, `Movies/${movieId}/comments`);
    retrieveData(commentRef, (snapshot) => {
      const commentGroup = document.querySelector('.commentsGroup');
      commentGroup.innerHTML = ""; 
      snapshot.forEach((childSnapshot) => {
        const comment = childSnapshot.val();
        addCard(comment);
      });
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const movieInfo = JSON.parse(sessionStorage.getItem("movie"));
    const movieId = movieInfo.movieID;
  
    loadComments(movieId); 
  });