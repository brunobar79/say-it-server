const express = require("express");
const player = require("./player.js");
const https = require("https");
const fs = require("fs");

const app = express();

const BASE_SPEECH_API_URL =
  "https://www.naturalreaders.com/api/v4/tts/lgcspeak?apikey=b98x9xlfs54ws4k0wc0o8g4gwc0w8ss&src=pw&s=-1";

app.get("/", (req, res) => {
  let source;

  if (req.query.speak) {
    //Default: Male
    let speaker = 1;
    if (req.query.gender && req.query.gender === "female") {
      speaker = 42;
    }

    let url = BASE_SPEECH_API_URL + "&r=" + speaker + "&t=" + req.query.speak;

    const tmpFilename = "tmp.mp3";
    const file = fs.createWriteStream(tmpFilename);
    const request = https
      .get(url, response => {
        response.pipe(file);
        file.on("finish", function() {
          file.close(_ => {
            player
              .play(tmpFilename)
              .then(r => {
                res.send(
                  "Saying " + req.query.speak + (req.query.gender
                    ? " in a " + req.query.gender + " voice"
                    : "")
                );
              })
              .catch(e => {
                res.status(500).send(e);
              });
          });
        });
      })
      .on("error", function(err) {
        // Handle errors
        fs.unlink(tmpFilename); // Delete the if (cb) cb(err.message);
        console.log("Error downloading the file");
      });
  } else {
    source = req.query.file;
    player
      .play("sounds/" + source)
      .then(r => {
        res.send(r);
      })
      .catch(e => {
        res.status(400).send(e);
      });
  }
});

app.listen(3000, () => console.log("SAY-IT SERVER RUNNING!"));
