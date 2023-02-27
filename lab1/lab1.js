const http = require("http");
const fs = require("fs");
fs.writeFileSync("lab1.txt", "lab1\n");
http
  .createServer((req, res) => {
    if (req.url != "/favicon.ico") {
      let url = req.url.split("/");
      let operator = url[1];
      var result = 0;
      url.splice(0, 2);
      console.log(url);
      switch (operator) {
        case "add":
          url.forEach((e) => {
            result += Number(e);
          });
          res.write(`<h1> sum of numbers is ${result} </h1>`);
          break;
        case "sub":
          result = Number(url[0]);
          url.slice(1).forEach((e) => {
            result -= Number(e);
          });
          res.write(`<h1> subtract of numbers is ${result} </h1>`);

          break;
        case "mul":
          result = 1;
          url.forEach((e) => {
            result *= Number(e);
          });
          res.write(`<h1> multiply of numbers is ${result} </h1>`);
          break;
        case "div":
          result = 1;
          url.forEach((e) => {
            result /= Number(e);
          });
          res.write(`<h1> division of numbers is ${result} </h1>`);
          break;
      }
      fs.appendFileSync(
        "lab1.txt",
        "operation " + operator + " result " + result + "\n"
      );
      console.log(req.method);
    }
    res.end();
  })
  .listen("7000", () => {});
