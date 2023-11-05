"use strict";

const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fe94dc0f65459345b6bdd258d8a7d3bc&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=fe94dc0f65459345b6bdd258d8a7d3bc&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);

async function getMovies(url) {

  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  showMovies(data.results);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_URL + searchTerm);
    console.log(SEARCH_URL + searchTerm);

    search.value = "";
  }
  else {
    window.location.reload();
  }
});


function showMovies(movieData) {

  main.innerHTML = "";

  movieData.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieCard = document.createElement("div");

    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div div class="movie-info" >
      <h3>${title}</h3>
      <span class="${movieRatingClass(vote_average)}">${vote_average.toFixed(1)}</span>
    </div>
      <div class="overview">
        <h3>Overview</h3>
        <p>${overview}</p>
      </div>`;
    main.appendChild(movieCard);
  });

}

function movieRatingClass(rating) {

  if (rating >= 8) { return "green" }
  else if (rating >= 5) { return "orange" }
  else { return "red" }
}