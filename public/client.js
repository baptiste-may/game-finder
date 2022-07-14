const socket = io();

socket.emit("get-data", "A:G");
socket.on("get-data", (data) => {
    let text = "Voici les jeux disponibles :\n"
    for (i = 1; i < data.length; i++) {
        text += `${data[i][0]} - `
    }
    text = text.slice(0, -2);
    $("#games").text(text);
});