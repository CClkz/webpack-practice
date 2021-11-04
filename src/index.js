// index.js
import { print } from "./util";
import "./index.css"

print("hello webpack 11");


let image = document.querySelector("#imgjs img")

// image.src = require("./imgs/grass.jpg").default;

import grassImg from "./imgs/grass.jpg";
image.src = grassImg;

new Promise(resolve => {
    setTimeout(() => {
        resolve("promise resolve")
    }, 1000);
}).then(res => {
    console.log(res);
});