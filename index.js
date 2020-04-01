const express = require("express");
const bodyParser = require("body-parser");
const { check, oneOf, validationResult } = require("express-validator");

const Purchase = require("./purchase");

const app = express();

let purchase = new Purchase();

app.use((req, _, next) => {
  let path = req._parsedUrl.pathname;

  if (path === "/") {
    purchase = new Purchase();
  }

  next();
});

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/ping", (_, res) => {
  // endpoint for pinging
  res.json({ status: "ok" });
});

app.post("/phoneline", (_, res) => {
  purchase.addPhoneLine();

  return res.status(201).json({
    status: "Created"
  });
});

app.delete("/phoneline", (_, res) => {
  purchase.deletePhoneLine();

  return res.status(200).json({
    status: "Ok"
  });
});

app.post("/phone", oneOf([check("id").isString()]), (req, res) => {
  try {
    validationResult(req).throw();
  } catch (err) {
    res.status(400).json(err);
  }

  purchase.addPhone(req.body.id);
  return res.status(201).json({
    status: "created"
  });
});

app.delete("/phone", oneOf([check("id").isString()]), (req, res) => {
  try {
    validationResult(req).throw();
  } catch (err) {
    res.status(400).json(err);
  }

  purchase.removePhone(req.body.id);
  return res.send();
});

app.get("/cart", (_, res) => {
  return res.json(purchase.getTotalCartInfo());
});

let appserver = app.listen(3000, err => {
  if (err) {
    console.log(err);
    process.exit();
  }

  console.log("Listening on port 3000");
});

const close = () => {
  appserver.close();
};

// Exporthing for testing
module.exports = {
  app: app,
  close: close
};
