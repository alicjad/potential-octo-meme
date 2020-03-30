const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
  let path = console.log(req._parsedUrl.pathname);

  if (path === "/") {
    // reset model here
  }

  next();
});

app.use(express.static("public"));
app.use(bodyParser.json());

app.listen(3000, err => {
  if (err) {
    console.log(err);
    process.exit();
  }

  console.log("Listening on port 3000");
  
});
