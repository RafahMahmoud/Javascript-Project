import {
  auth, //the same getAuth(app) but this in variable
  database, //the same getDatabase(app) but this in variable
  reference, //the same ref but this in variable
  addData, //the same set but this in variable
  retrieveData, //the same onValue but this in variable
  query,
} from "../../Firebase-config/firebase-config.js";

function getSecondMovies() {
  const moviesRefSecond = reference(database, "Movies/");
  retrieveData(moviesRefSecond, (snapshot) => {
    if (snapshot.exists()) {
      const moviesDataSecond = snapshot.val();
      for (let i = 4; i <= 11; i++) {
        createMovieCardSecond(moviesDataSecond[i]);
      }
    } else {
      console.log("No data available");
    }
  });
}

getSecondMovies();
function createMovieCardSecond(movie) {
  console.log(movie);
  let containerSecond = document.getElementById("group2");
  const cardSecond = document.createElement("div");
  cardSecond.classList.add("card");
  cardSecond.innerHTML = `
        <p class="title">${movie.name}</p>
        <div class="poster" style="background-image: url('${movie.imageVertical}'); background-size: cover;
        background-position: center;>
            <div class="reaction">
                <i class="fas fa-play play"></i>
            </div>
        </div>
        <div class="info">
            <div class="clock">
                <i class="fa-solid fa-clock clock"></i>
                <p class="time">${movie.duration}</p>
            </div>
            <div class="genre">${movie.genre}</div>
        </div>
    `;
  containerSecond.appendChild(cardSecond);
  cardSecond.style.backgroundImage = "movie.imageVertical";
  cardSecond.addEventListener("click", () => {
    sessionStorage.setItem("Name-Movie", movie.name);
    window.location.href = `http://127.0.0.1:5500/Pages/Movie-Details-Page/Movie-Details.html`;
  });
  return cardSecond;
}
