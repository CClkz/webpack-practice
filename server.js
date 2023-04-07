const express = require("express"); // 先安装 npm i express -D
const path = require("path");
const app = express();
app.use(express.static(path.resolve(__dirname, "dist"), { maxAge: 3600000 }))
app.listen(3001);
console.log("app listen 3001");