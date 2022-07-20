
$(function() {
  $("#header").load("../header.html");
  $("#footer").load("../footer.html");
});

const socket = io();

$("#random-button").on("click", (e) => {
  e.preventDefault();
  $("#random-button").css("opacity", 0);
  setTimeout(() => {
    $("#random-button").remove();
    socket.emit("get-random-game");
    socket.on("get-random-game", (game) => {
      $("#machine").css("grid-gap", "1em");
      $("#machine").append(`<p id="game-name">${game[0]}</p>`);
      $("#machine").css("background-image", `url("${game[1]}")`);
      $("#machine").append(`<p class="game-info">Difficultée : ${game[2]}</p>`);
      $("#machine").append(`<p class="game-info">Joueurs : ${game[3]} à ${game[4]}</p>`);
      $("#machine").append(`<p class="game-info">Temps de jeu : ${game[5]}min</p>`);
      if (game[6] != null) $("#machine").append(`<a href="${game[6]}" id="game-helper-link">Lien Game Helper</a>`);
      setTimeout(() => {
        $("#game-name").css("transform", "scale(1)");
        $(".game-info").css("transform", "scale(1)");
        $("#game-helper-link").css("transform", "scale(1)");
      }, 1);
    });
  }, 500);
});