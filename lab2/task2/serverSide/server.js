const http = require("http");
const fs = require("fs");
const { User } = require("./user");
let MainFileHTML = fs.readFileSync("../clientSide/form.html").toString();
let welcomeFileHTML = fs.readFileSync("../clientSide/welcome.html").toString();
let allUsersFileHTML = fs
  .readFileSync("../clientSide/allUsers.html")
  .toString();
let StyleCSS = fs.readFileSync("../clientSide/style.css").toString();
let ScriptFile = fs.readFileSync("../clientSide/getAllUsers.js").toString();
let myIcon = fs.readFileSync("../clientSide/favicon.ico");
let jsonFile = fs.readFileSync("../serverSide/clients.json");
let user;
let obj = {
  clients: [],
};
http
  .createServer((req, res) => {
    if (req.method == "GET") {
      switch (req.url) {
        case "/form.html":
          res.writeHead(200, "ok", { "set-cookie": "userName = 'hager'" });
          //   res.setHeader("Access-Control-Allow-Origin", "*");
          res.write(MainFileHTML);
          break;
        case "/welcome.html":
          res.write(welcomeFileHTML);
          break;
        case "/allUsers.html":
          res.write(allUsersFileHTML);
          break;
        case "/style.css":
          res.write(StyleCSS);
          break;
        case "/favicon.ico":
          res.writeHead(200, "ok", {
            "content-type": "image/vnd.microsoft.icon",
          });

          res.write(myIcon);
          break;
        case "/getAllUsers.js":
          res.writeHead(300, "Hii", { "content-type": "text/javascript" });
          res.write(ScriptFile);
          break;
        case "/serverSide/clients.json":
          res.writeHead(200, "ok", { "set-cookie": "here = 'lala'" });
          // res.end(jsonFile);
          res.write(jsonFile);

          break;
      }
      res.end();
    } else if (req.method == "POST") {
      req.on("data", (data) => {
        let name = data.toString().split("=")[1].split("&")[0];
        let mobile = data.toString().split("=")[2].split("&")[0];
        let email = decodeURIComponent(
          data.toString().split("=")[3].split("&")[0]
        );
        let address = data.toString().split("=")[4].split("&")[0];
        user = new User(name, mobile, email, address);
        obj.clients.push(user);
        fs.readFile("clients.json", "utf8", (err, d) => {
          if (err) {
            console.log(err);
          } else {
            obj = JSON.parse(d);
            obj.clients.push(user);
            fs.writeFile("clients.json", JSON.stringify(obj), "utf8", () => {});
          }
        });
      });
      req.on("end", () => {
        welcomeFileHTML = welcomeFileHTML.replace("{name}", user.name);
        welcomeFileHTML = welcomeFileHTML.replace("{mobile}", user.mobile);
        welcomeFileHTML = welcomeFileHTML.replace("{address}", user.address);
        welcomeFileHTML = welcomeFileHTML.replace("{email}", user.email);
        res.write(welcomeFileHTML);
        res.end();
      });
    }
  })
  .listen("7000", () => console.log("http://localhost:7000"));
