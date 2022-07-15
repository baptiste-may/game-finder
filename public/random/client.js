
$(function() {
    $("#header").load("../header.html");
  });

const socket = io();

$("#random-button").on("click", (e) => {
  e.preventDefault();
  $("#random-button").remove();
  socket.emit("get-random-game");
  socket.on("get-random-game", (game) => {
    $("#machine").append(`<p id="game-name">${game[0]}</p>`);
    $("#machine").css("background-image", `url("${game[1]}")`);
    setTimeout(() => {
      $("#game-name").css("transform", "scale(1)");
    }, 1);
  });
});