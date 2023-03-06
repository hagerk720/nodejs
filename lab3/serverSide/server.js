const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const { User } = require("./User");
let welcomeFileHTML = fs.readFileSync("../clientSide/welcome.html").toString();

const PORT = process.env.PORT || "7000";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let obj = [];
app.get("/main.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../clientSide/form.html"));
});
app.get("/allUsers.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../clientSide/allUsers.html"));
});
app.post(
  "/welcome.html",
  (req, res, next) => {
    let user = new User(
      req.body.name,
      req.body.mobile,
      req.body.email,
      req.body.address
    );
    fs.readFile("clients.json", "utf8", (err, d) => {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(d);
        obj.push(user);
        fs.writeFile("clients.json", JSON.stringify(obj), () => {
          console.log("hhhhhhh");
        });
      }
    });
    welcomeFileHTML = welcomeFileHTML.replace("{name}", user.name);
    welcomeFileHTML = welcomeFileHTML.replace("{mobile}", user.mobile);
    welcomeFileHTML = welcomeFileHTML.replace("{address}", user.address);
    welcomeFileHTML = welcomeFileHTML.replace("{email}", user.email);
    next();
  },
  (req, res) => {
    res.send(welcomeFileHTML);
  }
);
app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../clientSide/style.css"));
});
app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "../clientSide/favicon.ico"));
});
app.get("/getAllUsers.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../clientSide/getAllUsers.js"));
});
app.get("/serverSide/clients.json", (req, res) => {
  res.sendFile(path.join(__dirname, "../serverSide/clients.json"));
});

app.listen(PORT, () => {
  console.log("localhost:7000 listening");
});
