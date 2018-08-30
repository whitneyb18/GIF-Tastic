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
    console.log(yourSearch.data[0].images);
    for (i = 0; i < 5; i++) {
      var newImg = $("<img>");
      newImg.attr("src", yourSearch.data[i].images.fixed_height.url);
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
