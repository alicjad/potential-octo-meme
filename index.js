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

app.post("/phoneline", oneOf([check("amount").isInt()]), (req, res) => {
  try {
    validationResult(req).throw();
  } catch (err) {
    return res.status(400).json(err);
  }

  if (req.body.amount < 0 || req.body.amount > 8) {
    return res
      .status(400)
      .json({ message: "amount has to be between 0 and 8" });
  }

  if (req.body.amount < purchase.phoneLines.length) {
    while (req.body.amount < purchase.phoneLines.length) {
      purchase.deletePhoneLine();
    }
  } else {
    while (req.body.amount > purchase.phoneLines.length) {
      purchase.addPhoneLine();
    }
  }

  return res.status(200).json({
    status: "Ok",
    price: purchase.totalPrice()
  });
});

app.post("/phone", oneOf([check("id").isString()]), (req, res) => {
  try {
    validationResult(req).throw();
  } catch (err) {
    return res.status(400).json(err);
  }

  let phone = purchase.addPhone(req.body.id);

  if (phone)
    return res.status(201).json({
      status: "Created",
      price: purchase.totalPrice(),
      phone: phone
    });
  return res.status(400).send();
});

app.delete("/phone", oneOf([check("id").isString()]), (req, res) => {
  try {
    validationResult(req).throw();
  } catch (err) {
    return res.status(400).json(err);
  }

  let phone = purchase.removePhone(req.body.id);
  if (phone)
    return res.status(200).json({
      status: "Ok",
      price: purchase.totalPrice(),
      phone: phone
    });
  return res.status(400).send();
});

app.route("/cart").all((_, res) => {
  return res.json(purchase.getTotalCartInfo());
});

app.post("/connection", (_, res) => {
  purchase.addInternetConnection();
  return res.status(200).json({
    status: "Created",
    price: purchase.totalPrice()
  });
});

app.delete("/connection", (_, res) => {
  purchase.removeInternetConnection();
  return res.status(200).json({
    status: "Created",
    price: purchase.totalPrice(),
    phones: purchase.phones
  });
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
