
$(function() {
    $("#header").load("../header.html");
  });

const socket = io();

$("#random-button").on("click", (e) => {
  e.preventDefault();
  $("#random-button").remove();
  socket.emit("get-random-game");
  socket.on("get-random-game", (gameName) => {
    $("#machine").append(`<p id="game-name">${gameName}</p>`);
    setTimeout(() => {
      $("#game-name").css("transform", "scale(1)");
    }, 1);
  });
});