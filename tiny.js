/*
  Read me:
  Add the dev dependencies.
    npm install imagemin
    npm install imagemin-jpegtran
    npm install imagemin-pngquant
  Run this program in node.
    node tiny.js
  The program will compress all pictures (png,jpg) in static folder.
*/
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const exeFn = async(dir) => {
    const files = await imagemin([dir + '/*.{jpg,png}'], dir, {
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: '65-80'
            })
        ]
    });
};
var fs = require("fs")
var path = require("path")

var root = path.join(__dirname)
readDirSync(root + "/public")

function readDirSync(path) {
    var pa = fs.readdirSync(path);
    pa.forEach(function(ele, index) {
        var info = fs.statSync(path + "/" + ele)
        if (info.isDirectory()) {
            exeFn(path + "/" + ele);
            readDirSync(path + "/" + ele);
        }
    })
}
exeFn(root + "/public");
console.log("Finish");