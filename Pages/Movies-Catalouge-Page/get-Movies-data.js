import {
  auth, //the same getAuth(app) but this in variable
  database, //the same getDatabase(app) but this in variable
  reference, //the same ref but this in variable
  addData, //the same set but this in variable
  retrieveData, //the same onValue but this in variable
  query,
} from "../../Firebase-config/firebase-config.js";

function hereSection(movieData, index) {
  document.getElementById(`img-${index}`).src = movieData.imageHorizontal;
  // document.getElementById(`text-${index}`).innerText = `${movieData.Name} - ${movieData.Genre} - ${movieData.Duration}`;
}

function getThreeMovies() {
  const moviesRef = reference(database, "Movies/");
  retrieveData(moviesRef, (snapshot) => {
    if (snapshot.exists()) {
      const moviesData = snapshot.val();
      console.log(moviesData.imageHorizontal);
      let x = 1;
      for (let i = 2; i <= 4; i++) {
        hereSection(moviesData[i], x);
        x++;
      }
    } else {
      console.log("No data available");
    }
  });
}

getThreeMovies();

// function hereSection(moviesData){
//     console.log(moviesData);
// }

let allMovies = [];

function fetchMovies() {
  const moviesRef = reference(database, "Movies/");
  retrieveData(moviesRef, (snapshot) => {
    const moviesContainer = document.querySelector(".cards-container");
    moviesContainer.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      const movie = childSnapshot.val();
      const movieId = childSnapshot.key;
      allMovies.push({ ...movie, id: movieId });
    });
    displayMovies(allMovies);
  });
}

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
        <p class="title">${movie.name}</p>
        <div class="poster" style="background-image: url('${movie.imageVertical}'); background-size: cover; background-position: center;">
            <div class="reaction">
                <i class="fas fa-play play"></i>
            </div>
        </div>
        <div class="info">
            <div class="clock">
                <i class="fa-solid fa-clock clock"></i>
                <p class="time">${movie.duration}</p>
            </div>
            <div class="rate">${movie.rating}</div>
        </div>
    `;
  card.addEventListener("click", () => {
    sessionStorage.setItem("movie", JSON.stringify(movie));
    window.location.href = `http://127.0.0.1:5500/Pages/Movie-Details-Page/Movie-Details.html`;
  });
  return card;
}

function displayMovies(movies) {
  const moviesContainer = document.querySelector(".cards-container");
  moviesContainer.innerHTML = "";
  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    moviesContainer.appendChild(card);
  });
}

const filterMoviesBySearch = (movies, searchQuery) => {
  if (!searchQuery) {
    return movies;
  }
  return movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

function searchMovies(e) {
  e.preventDefault();
  console.log("Hello");
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  let filteredMovies = filterMoviesBySearch(allMovies, searchTerm);
  const genreSelect = document.getElementById("genre-filter");
  const genreValue = genreSelect.value;
  filteredMovies = filterByGenre(filteredMovies, genreValue);
  displayMovies(filteredMovies);
}

function filterByGenre(moviesToFilter, filterCriteria) {
  console.log(moviesToFilter[0].genre);
  let filteredMovies = [];
  if (!filterCriteria) {
    return moviesToFilter;
  }
  for (let i = 0; i < moviesToFilter.length; i++) {
    if (moviesToFilter[i].genre == filterCriteria) {
      filteredMovies.push(moviesToFilter[i]);
    }
  }
  return filteredMovies;
}

document.getElementById("filter").addEventListener("click", searchMovies);
document.addEventListener("DOMContentLoaded", fetchMovies);
