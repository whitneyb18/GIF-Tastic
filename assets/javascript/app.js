var presetButtons = [
  "Tina Turner",
  "Michael Jackson",
  "Cyndi Laupner",
  "Bon Jovi"
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
    "http://api.giphy.com/v1/gifs/search?q=" +
    yourSearch +
    "&api_key=jkkfvmGPOCF7pMALWDXDcKaaUqRtla0W";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(yourSearch) {
    for (i = 0; i < 5; i++) {
      console.log(yourSearch);
      var newImg = $("<img>");
      newImg.addClass("yourGif");
      newImg.attr("src", yourSearch.data[i].images.fixed_height.url);
      newImg.attr("data-animate", yourSearch.data[i].images.fixed_height.url);
      newImg.attr(
        "data-still",
        yourSearch.data[i].images.fixed_height_still.url
      );
      newImg.attr("data-state", "animate");
      var imgRating = $("<p>");
      $(imgRating).text("Rating: " + yourSearch.data[i].rating);
      $("#gifDump").prepend(imgRating);
      $("#gifDump").prepend(newImg);
    }
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
