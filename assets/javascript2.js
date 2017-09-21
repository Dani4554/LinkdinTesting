// console.log(window.location.search.slice(0));
var searchQuery = window.location.search;
var result;
var food;
var array = [];
searchQuery = searchQuery.toString();
console.log(searchQuery);



if(searchQuery == "?happy"){

  var genre = "The Recommended Genre is Comedy";
  $("#display-movie").append("<p class='title'>" + genre + "</p>");

 $.ajax({
      url: "https://api.themoviedb.org/3/discover/movie?api_key=534943cf14aa7237f3186e2f1ebd855f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35",
      method: "GET"
    }).done(function(response) {
      console.log("Comedy: " + response);
      console.log(response);
      getMovies(response);
    });
  
    food = "Pizza";
    $("#food-name").html(food);

  }




if(searchQuery == "?angry"){

   var genre = "The Recommended Genre is Action";
   $("#display-movie").append("<p class='title'>" + genre + "</p>");

    $.ajax({
      url: "https://api.themoviedb.org/3/discover/movie?api_key=534943cf14aa7237f3186e2f1ebd855f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28",
      method: "GET"
    }).done(function(response) {
      console.log("Action: " + response);
      console.log(response);
      getMovies(response);
    });

    food = "Chinese Food";
    $("#food-name").html(food);

  }




if(searchQuery == "?sad"){

  var genre = "The Recommended Genre is Fantasy";
  $("#display-movie").append("<p class='title'>" + genre + "</p>");

  $.ajax({
      url: "https://api.themoviedb.org/3/discover/movie?api_key=534943cf14aa7237f3186e2f1ebd855f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=14",
      method: "GET"
    }).done(function(response) {
      console.log("Fantasy: " + response);
      console.log(response);
      getMovies(response);
    });

    food = "Ice Cream or Cake";
    $("#food-name").html(food);

  }





if(searchQuery == "?contempt"){

  var genre = "The Recommended Genre is Drama";
  $("#display-movie").append("<p class='title'>" + genre + "</p>");

  $.ajax({
      url: "https://api.themoviedb.org/3/discover/movie?api_key=534943cf14aa7237f3186e2f1ebd855f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=18",
      method: "GET"
    }).done(function(response) {
      console.log("Drama: " + response);
      console.log(response);
      getMovies(response);
    });

    food = "Surf and Turf";
    $("#food-name").html(food);

  }





if(searchQuery == "?disgusted"){

  var genre = "The Recommended Genre is Horror";
  $("#display-movie").append("<p class='title'>" + genre + "</p>");

  $.ajax({
      url: "https://api.themoviedb.org/3/discover/movie?api_key=534943cf14aa7237f3186e2f1ebd855f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27",
      method: "GET"
    }).done(function(response) {
      console.log("Horror: " + response);
      console.log(response);
      getMovies(response);
    });

    food = "Popcorn if anything";
    $("#food-name").html(food);

  }





if(searchQuery == "?fear"){

  var genre = "The Recommended Genre is Family";
  $("#display-movie").append("<p class='title'>" + genre + "</p>");

  $.ajax({
      url: "https://api.themoviedb.org/3/discover/movie?api_key=534943cf14aa7237f3186e2f1ebd855f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=10751",
      method: "GET"
    }).done(function(response) {
      console.log("Family: " + response);
      console.log(response);
      getMovies(response);
    });

    food = "Burgers and Hot Dogs";
    $("#food-name").html(food);

}




if(searchQuery == "?surprise"){

  var genre = "The Recommended Genre is Documentary";
  $("#display-movie").append("<p class='title'>" + genre + "</p>");

  $.ajax({
      url: "https://api.themoviedb.org/3/discover/movie?api_key=534943cf14aa7237f3186e2f1ebd855f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=99",
      method: "GET"
    }).done(function(response) {
      console.log("Documentary " + response);
      console.log(response);
      getMovies(response);
    });

    food = "Tacos";
    $("#food-name").html(food);
}

  display();


 $("#try").on("click", function(event){

  window.location = "index.html"
 }); 







function getMovies(response){

  for(var i = 0; i <= 9; i++){
    var movie;
    movie = response.results[i.toString()].title;
    array.push(movie);
    console.log(array);
  }

  for(var i =0; i <= 9; i++){
   var name = array[i];

   $("#display-movie").append("<button class='but'" + 'data-name="' + name +'"' + "data-toggle='modal' data-target='#myModal' > " + name.toString() + "</button> <br><br>");
   //$(".but").attr("data-" + name.toString());
  }
}



function display(){
  var emotion;

  if(searchQuery == "?happy"){
    emotion = "Happy";
  }
  if(searchQuery == "?angry"){
    emotion = " Angry";
  }
  if(searchQuery == "?sad"){
    emotion = "Sad";
  }
  if(searchQuery == "?contempt"){
    emotion = "Contempt";
  }
  if(searchQuery == "?disgusted"){
    emotion = "Disgusted";
  }
  if(searchQuery == "?fear"){
    emotion = "Fear";
  }
  if(searchQuery == "?surprise"){
    emotion = "Surprise"
  }

  console.log(emotion);

  $("#emotion-name").html(emotion);


}

function displayMovieInfo(movie) {

        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          console.log(response);
          // Creating a div to hold the movie
          var movieDiv = $("<div class='movie'>");
          // Storing the rating data
          var rating = response.Rated;
          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rating);
          // Displaying the rating
          movieDiv.append(pOne);
          // Storing the release year
          var released = response.Released;
          // Creating an element to hold the release year
          var pTwo = $("<p>").text("Released: " + released);
          // Displaying the release year
          movieDiv.append(pTwo);
          // Storing the plot
          var plot = response.Plot;
          // Creating an element to hold the plot
          var pThree = $("<p>").text("Plot: " + plot);
          // Appending the plot
          movieDiv.append(pThree);
          // Retrieving the URL for the image
          var imgURL = response.Poster;
          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);
          // Appending the image
          movieDiv.append(image);
          // Putting the entire movie above the previous movies
          var title = response.title
          $(".modal-title").html(title)
          $(".modal-body").html(movieDiv);
          $(".modal-title").html(movie);
        });
      }


$("body").on("click", ".but", function(){
    console.log("working");
    console.log($(this).attr("data-name"));
    var movie = $(this).attr("data-name");

    displayMovieInfo(movie);


})




