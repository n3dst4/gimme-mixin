"use strict";

var fs = require("fs");
var path = require("path");

fs.readdir(path.join(__dirname, "..", "tests"), function (err, files) {
  if (err) { throw err; }
  files.filter(function (file) {return /^test-.*\.js$/.test(file);}).
    map(function (file) { return file.replace(/\.js$/, ""); }).
    forEach(function (file) { require("../tests/" + file); });
});
