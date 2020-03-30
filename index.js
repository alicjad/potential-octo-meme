const express = require("express");

const app = express();

app.use(express.static("public"));

app.listen(3000, err => {
  if (err) {
    console.log(err);
    process.exit();
  }

  console.log("Listening on port 3000");
  
});
