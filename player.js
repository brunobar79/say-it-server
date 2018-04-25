const fs = require("fs");
const lame = require("lame");
const Speaker = require("speaker");

module.exports = {
  play: (filename) => {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(filename)) {
        fs
          .createReadStream(filename)
          .pipe(new lame.Decoder())
          .on("format", function(format) {
            this.pipe(new Speaker(format));
            resolve("playing " + filename);
          })
          .on("error", function(error) {
            reject(error.toString());
          });
          
      } else {
        reject("Could not find " + filename);
      }
    });
  }     
}
