const server = require("express")();
const Twit = require("twit");
const socketIO = require("socket.io");
require("dotenv").config();
server.set("view engine", "pug");
const firebase = require("firebase-admin");
const moment = require("moment");
const { push } = require("./database/index");

var T = new Twit({
  consumer_key:'jNrTy4gXJf6G0hdxqDC8Oh22D' ,
  consumer_secret: '6MTBA5ygrSarlio1u88SwcIS5hPa5WYpuvLExhykeEZio4rBEv',
  access_token:'947879482827796480-UFLcB8kdfrzSpPbwKfoSa1uej6NvfFt',
  access_token_secret: 'kjamBC7NSYtrOKyHLt59JafdkLIW0Od9CETSUyRAffnQP'
  // timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  // strictSSL: true // optional - requires SSL certificates to be valid.
});

// var firebaseConfig = {s
//   apiKey: "AIzaSyCE6-PAF2G9pCoapYm5ANPovtbiIjl2Mgo",
//   authDomain: "swp-final-exam-49609.firebaseapp.com",
//   databaseURL: "https://swp-final-exam-49609.firebaseio.com",
//   projectId: "swp-final-exam-49609",
//   storageBucket: "swp-final-exam-49609.appspot.com",
//   messagingSenderId: "70623787007",
//   appId: "1:70623787007:web:72446ab1245061cb"
// };
// firebase.initializeApp(firebaseConfig);

const port = process.env.PORT || "4000";

const app = server.listen(port, () => {
  console.log("Server is listening at " + port);
});

const io = socketIO.listen(app);
io.on("connection", client => {
  console.log("user connected");
  client.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// app.get('/', (req, res) => {
//     var params = {screen_name: 'nodejs'};
//     client.get('statuses/user_timeline', params, function(error, tweets, response) {
//         if (!error) {
//             res.send(tweets);
//         }
//     });
// })

server.get("/", (re1, res) => {
  res.send("test swp api");
});

var stream = T.stream("statuses/filter", { track: "tradewar" });
let data = {
  time: moment()
    .startOf("minute")
    .toISOString(),
  count: 0
};
stream.on("tweet", async function(tweet) {
  // console.log(tweet);
  if (
    moment()
      .startOf("minute")
      .toISOString() !== data.time
  ) {
    console.log(data);
    push(data);
    io.sockets.emit("new-message", data);
    data.time = moment()
      .startOf("minute")
      .toISOString();
    data.count = 0;
  } else {
    data.count = data.count + 1;
  }
});
