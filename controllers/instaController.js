/* eslint-disable prettier/prettier */
var express = require("express");
var router = express.Router();
var ig = require("instagram-tagscrape");

// var Instafeed = require("instafeed.js");

// router.get("/insta", function(req, res) {
//   var feed = new Instafeed({
//     get: "tagged",
//     tagName: "trashtag",
//     clientId: "6aea186d5f834a70ba0e70f79b24bdda",
//     success: function() {
//       console.log("success");
//     }
//   });
//   feed.run();
// });

router.get("/insta", function(req, res) {
  ig.scrapeTagPage("trashtag").then(function (result) {
    console.log(result);
  });
  
});


module.exports = router;
