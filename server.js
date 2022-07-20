const { Socket } = require("socket.io");

const express = require("express");

const app = express();
const http = require("http").createServer(app);
const path = require("path");
const port = 3000;

/**
 * @type {Socket}
 */
const io = require("socket.io")(http);

const { google } = require("googleapis");
const keys = require("./keys.json");

const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

app.use("/jquery", express.static(path.join(__dirname, "node_modules/jquery/dist")));
app.use(express.static("public"));
app.use(express.static("public/search"));
app.use(express.static("public/random"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/search/index.html"));
});
app.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname, "public/search/index.html"));
});
app.get("/random", (req, res) => {
  res.sendFile(path.join(__dirname, "public/random/index.html"));
});

http.listen(port, () => {
    console.log(`App server is running on port ${port}`);
});

client.authorize((err, tokens) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Connected to Google Sheets API !");
  }
});

io.on("connection", (socket) => {
    socket.on("get-data", () => {
      gsrun(client, "A2:G").then(() => {
        socket.emit("get-data", DATA);
      });
    });
    socket.on("get-random-game", () => {
      gsrun(client, "A2:G").then(() => {
        const game = DATA[Math.floor(Math.random() * DATA.length)];
        socket.emit("get-random-game", game);
      });
    });
    socket.on("get-game-data", (gameName) => {
      gsrun(client, "A2:G").then(() => {
        let data = null;
        for (i = 0; i < DATA.length; i++) {
          if (DATA[i][0] == gameName) {
            data = DATA[i];
          }
        }
        socket.emit("get-game-data", data);
      });
    });
});

let DATA;

async function gsrun(cl, ran) {
  const gsapi = google.sheets({version: "v4", auth: cl});
  const opt = {
    spreadsheetId: "1SmKEXTDvOt-jvDs6K9DEGeoWtzDzluDdw1rSQv_rV1k",
    range: ran
  };
  let data = await gsapi.spreadsheets.values.get(opt);
  DATA = data.data.values;
}