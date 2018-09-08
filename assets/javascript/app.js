var presetButtons = [
  "The Breakfast Club",
  "Ferris Buller's Day Off",
  "Back to the Future",
  "Pretty in Pink"
];

function renderButtons() {
  $("#buttonDump").empty();
  for (i = 0; i < presetButtons.length; i++) {
    var button = $("<button>");
    button.addClass("eighties btn btn-info");
    button.attr("data-name", presetButtons[i]);
    button.text(presetButtons[i]);
    $("#buttonDump").append(button);
  }
}

function displayGifs() {
  var yourSearch = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    yourSearch +
    "&limit=10&rating=g&rating=pg&api_key=jkkfvmGPOCF7pMALWDXDcKaaUqRtla0W";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(yourSearch) {
    for (i = 0; i < 10; i++) {
      var newImg = $("<img>");
      newImg.addClass("yourGif");
      newImg.attr("src", yourSearch.data[i].images.fixed_height.url);
      newImg.attr("data-animate", yourSearch.data[i].images.fixed_height.url);
      newImg.attr(
        "data-still",
        yourSearch.data[i].images.fixed_height_still.url
      );
      newImg.attr("data-state", "animate");
      var newDiv = $("<div>");
      newDiv.addClass("float-left");

      var imgRating = $("<p>");
      imgRating.text("Rating: " + yourSearch.data[i].rating);
      $(newDiv).prepend(imgRating);
      $(newDiv).prepend(newImg);

      $("#gifDump").prepend(newDiv);
    }
    console.log(yourSearch);
  });
}
renderButtons();

$("#grabThatGif").on("click", function() {
  event.preventDefault();
  var userInput = $("#userInput").val();
  presetButtons.push(userInput);
  renderButtons();
  $("#userInput").val("");
});

$(document).on("click", ".eighties", displayGifs);

$(document).on("click", ".yourGif", function() {
  var state = $(this).attr("data-state");
  if (state === "animate") {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  } else {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
});
