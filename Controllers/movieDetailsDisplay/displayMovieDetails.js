function displayMovieDetails() {
  let movieTitle = document.getElementById("Movie-Title");
  let movieDescription = document.getElementById("Movie-Description");
  let starsContainer = document.getElementById("Star-Cards-Container");
  let productionYear = document.getElementById("yearOfProduction");
  let genre = document.getElementById("genreOfMovie");
  let movieLanguage = document.getElementById("languageOfMovie");
  let director = document.getElementById("directorOfMovie");
  let movieData = JSON.parse(sessionStorage.getItem("movie"));
  let movieImage = document.getElementById("Movie-Details");

  console.log(movieData.imageHorizontal);
  movieImage.style.backgroundImage = "url(" + movieData.imageHorizontal + ")";
  movieTitle.innerText = movieData.name;
  movieDescription.innerText = movieData.description;
  productionYear.innerText = movieData.releaseYear;
  genre.innerText = movieData.genre;
  movieLanguage.innerText = movieData.language;
  director.innerText = movieData.director;

  let length = Object.keys(movieData.mainActors).length;
  console.log(movieData.image);
  for (let i = 0; i < length; i++) {
    let starCards = document.createElement("div");
    starCards.className = "Star-Cards";

    starCards.innerText = movieData.mainActors[i];

    starsContainer.appendChild(starCards);
  }
}

displayMovieDetails();
