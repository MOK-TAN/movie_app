// to get data from server

//   get dom
let movie_img = document.getElementById("movie_img_url");
let movie_title = document.getElementById("movie_title");
let movie_input = document.getElementById("movie_input");
let movie_search = document.getElementById("movie_search");

movie_search.onclick = function () {
  let movie_input = document.getElementById("movie_input");
  if (movie_input.value == "") {
    alert("please enter movie name");
    return;
  }
  getMovie(movie_input.value);
  movie_input.value = "";
};

//   let url = `https://www.omdbapi.com/?t=${movie_name}&plot=full`;
//   let imgUrl =
let api_key = "4588c4f5";

async function firstLoadMovie() {
  // let url = `https://www.omdbapi.com/?t=${movie_name}&plot=full`;
  document.getElementById("detail_movie_show").style.display = "none";
  document.getElementById("error_handle").style.display = "none";
  let movies_to_load = ["godfather", "avatar", "everest"];
  let div_movies = "";
  movies_to_load.forEach(async (i) => {
    let url = `https://www.omdbapi.com/?apikey=${api_key}&t=${i}&plot=full`;
    let movie = await fetch(url);
    if (!movie.ok) {
      throw new Error("movie handling gone wrong");
    }
    let data = await movie.json();
    // console.log(data);
    let movie_hero = movieBack(data);
    // console.log(movie_hero);
    div_movies += movie_hero;
    // console.log("inside div", div_movies);
    document.getElementById("search_result").innerHTML = div_movies;
  });
  // let movie = await fetch(url);
  // if (!movie.ok) {
  //   throw new Error("movie handling gone wrong");
  // }
  // let data = movie.json();
  // let movie_hero = movieBack(data);
  // div_movies += movie_hero;
  // console.log("div", div_movies);
}

firstLoadMovie();

function movieBack(data) {
  // let movie_structure = "";
  let movie_one = "";
  // console.log(data.Title);
  let movie = `
            <div class='float' onclick="displayDetailMovie('${data.Title}')" >
            <div  id="movie_img">
          <img
            width="200px"
            height="250px"
            id="movie_img_url"
            src=${data.Poster}
            alt="movie ko image hai"
          />
        </div>
        <div id="movie_details">
          <h5 class="movie_title">${data.Title}</h5>
          <h5 class="movie_title">${data.Year}</h5>
        </div>
      </div>`;
  movie_one += movie;

  return movie_one;
}

// displayDetailMovie("avenger");

// function d() {
//   document.getElementById("detail_movie_show").style.display = "block";
// }

// d();

function c() {
  console.log("div clicked");
}

async function displayDetailMovie(i) {
  console.log("clicked ");
  document.getElementById("search_result").style.display = "none";
  let url = `https://www.omdbapi.com/?apikey=${api_key}&t=${i}&plot=full`;

  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("HAPPENED ERROR");
    }

    let data = await response.json();
    document.getElementById("detail_movie_show").style.display = "block";

    let movie = `
    
      <div  id="movie_img_click">
    <img
      width="200px"
      height="250px"
      id="movie_img_url"
      src=${data.Poster}
      alt="movie ko image hai"
    />
  </div>
  <div id="movie_details_click">
    <h5 > <span class="movie_title" id='movie_details_title' > ${data.Title} </span> </h5>
    
    <h5 class="click_title" >Year : <span class="click_value" id="movie_details_year" >${data.Year} </span></h5>
    <h5 class="click_title" >Genre : <span class="click_value" id="movie_details_genre" > ${data.Genre}</span></h5>
    <h5 class="click_title" >Actor : <span class="click_value" id="movie_details_actor" > ${data.Actors}</span></h5>
    <h5 class="click_title" >Director : <span class="click_value" id="movie_details_director"> ${data.Director}</span></h5>
    <div id="movie_click_watch">
      <button id="movie_click_button" onclick='clickMovieButton("${data.Title}")' >
      
      Watch Recap
    </button>
    </div>
  </div>
  
    
            `;
    document.getElementById("detail_movie_show").innerHTML = movie;
    // console.log(document.getElementById("detail_movie_show"));
  } catch (err) {
    console.log("error occured");
  }
}

async function getMovie(name) {
  // s parameter
  let url = `http://www.omdbapi.com/?apikey=${api_key}&s=${name}`;
  try {
    document.getElementById("detail_movie_show").style.display = "none";
    document.getElementById("error_handle").style.display = "none";
    document.getElementById("search_result").style.display = "block";
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error("data not get");
    }
    let data = await response.json();
    // console.log(data);
    // <div class='float' onclick="c()" >
    let movie_structure = "";
    for (let i = 0; i < data.Search.length; i++) {
      let movie = `
         <div class='float' onclick="displayDetailMovie('${data.Search[i].Title}')" >
            <div  id="movie_img">
          <img
            width="200px"
            height="250px"
            id="movie_img_url"
            src=${data.Search[i].Poster}
            alt="movie ko image hai"
          />
        </div>
        <div id="movie_details">
          <h5 class="movie_title">${data.Search[i].Title}</h5>
          <h5 class="movie_title">${data.Search[i].Year}</h5>
        </div>
      </div>`;
      movie_structure += movie;
    }

    console.log(data);
    document.getElementById("search_result").innerHTML = movie_structure;
  } catch (err) {
    document.getElementById("error_handle").style.display = "block";
    document.getElementById("search_result").style.display = "none";
    console.log(err);
  }
}

//   getMovie();
function clickMovieButton(moviename) {
  // location.href = "https://www.youtube.com/results?search_query=avengerrecap";
  window.open(
    `https://www.youtube.com/results?search_query=${moviename} recap`,
    "_blank"
  );
}

// document.getElementById("movie_click_button").onclick = function () {
//   clickMovieButton("spiderman");
// };
